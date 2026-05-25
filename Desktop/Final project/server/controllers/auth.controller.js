const { request } = require("express");
const { User } = require("../models/User");
const hashService = require("../utils/hash.service");
const tokenService = require("../utils/token.service");
exports.login = async (request, response) => {
    try {
        const { email , password } = request.value;
        console.log("Login attempt - Email:", email);
        const user = await User.findOne({email});
        console.log("User found:", user);
        if(!user)
            return response
        .status(401)
        .json({message:"Invalid credentials", data: null})

        const isMatch = await hashService.compare(password, user.password);
        if (!isMatch)
            return response
        .status(401)
        .json({message:"Invalid credentials", data: null})

        return response.status(200).json({message: "Login successful", data:{
            token: tokenService.generate({id:user._id, role: user.role, email: user.email, name: user.name}),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        }})
    } catch (error) {
            console.log(error);
    response.status(500).json({message: "Internal server error",data: null})
    }
}
exports.register = async (request, response) => {
    try {
      const { email , password } = request.value;
      console.log("Register attempt - Email:", email, "Name:", request.value.name);
      const user = await User.findOne ({email});
      if (user)
        return response
    .status(409)
    .json({message: "Email Already Exist", data: null})
    const hashedPassword = await hashService.hash(password);
    const newUser = await User.create({
        ...request.value,
        password: hashedPassword,
    })
    console.log("New user created:", newUser);

    return response.status(201).json({message: "User Created", data:{
        token:tokenService.generate({id:newUser._id,role: newUser.role}),
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    }})
    } catch (error) {
    console.log(error);
    response.status(500).json({message: "Internal server error",data: null})
    }
};
exports.verifyMe = async (request, response) => {
    try{
        return response.json({message: "Verified", data: {
            user: {
                id: request.user._id,
                name: request.user.name,
                email: request.user.email,
                role: request.user.role,
                profilePicture: request.user.profilePicture,
                profession: request.user.profession,
                college: request.user.college,
                age: request.user.age,
                bio: request.user.bio,
            }
        }})
    } catch (error) {
            console.log(error);
    response.status(500).json({message: "Internal server error",data: null})
    }
}

exports.updateProfile = async (request, response) => {
    try {
        const userId = request.user?._id;
        const { name, profession, college, age, bio } = request.body;

        // Build update object - allow empty strings to clear fields
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (profession !== undefined) updateData.profession = profession;
        if (college !== undefined) updateData.college = college;
        if (age !== undefined) updateData.age = age;
        if (bio !== undefined) updateData.bio = bio;

        // Handle profile picture upload
        if (request.file) {
            updateData.profilePicture = `/uploads/${request.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profilePicture: user.profilePicture,
                    profession: user.profession,
                    college: user.college,
                    age: user.age,
                    bio: user.bio,
                }
            }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

exports.getNotifications = async (request, response) => {
    try {
        const userId = request.user?._id;

        const user = await User.findById(userId)
            .populate({
                path: 'likeNotifications.post',
                select: 'text _id'
            })
            .populate({
                path: 'likeNotifications.fromId',
                select: 'name profilePicture'
            })
            .populate({
                path: 'commentNotifications.post',
                select: 'text _id'
            })
            .populate({
                path: 'commentNotifications.fromId',
                select: 'name profilePicture'
            })
            .populate({
                path: 'postNotifications.post',
                select: 'text _id createdAt'
            });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const unreadCount = {
            likes: user.likeNotifications.filter(n => !n.isRead).length,
            comments: user.commentNotifications.filter(n => !n.isRead).length,
            posts: user.postNotifications.length
        };

        return response.status(200).json({
            message: 'Notifications retrieved',
            data: {
                likeNotifications: user.likeNotifications,
                commentNotifications: user.commentNotifications,
                postNotifications: user.postNotifications,
                unreadCount
            }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error retrieving notifications', error: error.message });
    }
};

exports.markNotificationAsRead = async (request, response) => {
    try {
        const userId = request.user?._id;
        const { notificationType, notificationId } = request.body;

        if (!['like', 'comment', 'post'].includes(notificationType)) {
            return response.status(400).json({ message: 'Invalid notification type' });
        }

        let fieldName;
        if (notificationType === 'like') {
            fieldName = 'likeNotifications';
        } else if (notificationType === 'comment') {
            fieldName = 'commentNotifications';
        } else if (notificationType === 'post') {
            fieldName = 'postNotifications';
        }
        
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { [`${fieldName}.$[elem].isRead`]: true } },
            { arrayFilters: [{ 'elem._id': notificationId }], new: true }
        );

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({
            message: 'Notification marked as read',
            data: { user }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error marking notification', error: error.message });
    }
};

exports.clearNotification = async (request, response) => {
    try {
        const userId = request.user?._id;
        const { notificationType, notificationId } = request.body;

        if (!['like', 'comment', 'post'].includes(notificationType)) {
            return response.status(400).json({ message: 'Invalid notification type' });
        }

        let fieldName;
        if (notificationType === 'like') {
            fieldName = 'likeNotifications';
        } else if (notificationType === 'comment') {
            fieldName = 'commentNotifications';
        } else if (notificationType === 'post') {
            fieldName = 'postNotifications';
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { [fieldName]: { _id: notificationId } } },
            { new: true }
        );

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({
            message: 'Notification cleared',
            data: { user }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error clearing notification', error: error.message });
    }
};

