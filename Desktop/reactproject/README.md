# E-Commerce React Application

A full-featured e-commerce application built with React and Redux, providing comprehensive functionality for browsing products, managing shopping carts, and viewing user information.

## Project Overview

This is a modern e-commerce platform with the following key features:

- **User Authentication**: Register and login functionality with secure credential management
- **Product Catalog**: Browse, search, filter, and paginate through products
- **Product Details**: View detailed information about individual products
- **Users Directory**: Browse all users, search, and view detailed user profiles
- **Shopping Carts**: View and manage shopping carts with full details
- **Responsive Design**: Mobile-friendly UI using Bootstrap
- **State Management**: Redux with Redux Toolkit for centralized state management
- **API Integration**: Integration with DummyJSON API for backend services

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI component library
- **React Icons** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool and development server

### Development Tools
- **ESLint** - Code quality and linting
- **Node.js** - Runtime environment

## Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reactproject.git
   cd reactproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Project Structure

```
reactproject/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── api.js         # Axios API configuration
│   ├── components/         # Reusable components
│   │   ├── CartCard.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── UserCard.jsx
│   │   └── UserPagination.jsx
│   ├── pages/              # Page components
│   │   ├── CartDetails.jsx
│   │   ├── Carts.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Register.jsx
│   │   ├── UserDetails.jsx
│   │   └── Users.jsx
│   ├── store/              # Redux store
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── productSlice.js
│   │   ├── userSlice.js
│   │   └── Store.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── assets/             # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

## Features

### Authentication Module
- User registration with email validation
- Secure login with password verification
- Session management using JWT tokens
- Logout functionality with token cleanup
- Error handling and validation

### Products Module
- Display all products with pagination (10 per page)
- Search products by keywords
- Filter by category
- Sort by price, rating, or title
- View detailed product information
- Responsive product grid layout

### Users Module
- Display all users with pagination
- Search users by name or email
- View detailed user profiles
- Display user information (name, email, phone, age, address, company)

### Carts Module
- View all shopping carts
- Display cart items with details
- Show cart totals
- Delete carts
- Fully responsive cart layout

### Navigation
- Top navigation bar with responsive menu
- Conditional rendering of login/logout buttons
- Active route highlighting
- Mobile hamburger menu

## API Integration

The application integrates with the DummyJSON API:
- Base URL: `https://dummyjson.com`
- Endpoints used:
  - `/products` - Products listing and pagination
  - `/products/{id}` - Single product details
  - `/products/search` - Search products
  - `/products/categories` - Product categories
  - `/products/category/{category}` - Filter by category
  - `/auth/login` - User login
  - `/auth/signup` - User registration
  - `/auth/me` - Current user info
  - `/users` - Users listing
  - `/users/{id}` - Single user details
  - `/users/search` - Search users
  - `/carts` - All carts
  - `/carts/{id}` - Cart details

## Local Authentication

For registration and login, the application uses a hybrid approach:
- New registrations are stored in localStorage
- Credentials are validated against stored users
- Login also supports DummyJSON predefined users
- Token is generated and stored for session management

**Test Credentials (DummyJSON Users):**
- Username: `emilys` | Password: `emilyspass`
- Username: `michaelw` | Password: `michaelwpass`

## Usage Examples

### Register a New Account
1. Click "Register" in the navbar
2. Enter username, email, and password
3. Click "Register" button
4. Redirected to login page
5. Log in with your credentials

### Search Products
1. Go to Products page (home)
2. Use the search bar to find products by keyword
3. Filter by category using the category dropdown
4. Sort results by price, rating, or title

### Browse Users
1. Click "Users" in the navbar
2. View all users with pagination
3. Search for users by name or email
4. Click "View Details" to see full user information

### View Cart Details
1. Navigate to Carts page
2. Click "View" on any cart
3. See detailed breakdown of items and total

## Error Handling

The application includes comprehensive error handling:
- API request validation
- Error messages displayed to users
- Loading states for async operations
- Null checks for missing data
- Token validation in API interceptor

## Known Issues & Notes

### Current Implementation Notes
- Authentication uses localStorage for local user storage (production should use real backend)
- DummyJSON API has limitations for cart operations (read-only)
- Search functionality works with DummyJSON search endpoints
- Token validation is simplified for demo purposes

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox support required

### Performance Considerations
- Pagination implemented (10 items per page)
- API caching handled by browser
- Responsive images for different screen sizes
- Lazy loading ready for future implementation

## Future Enhancements

- [ ] Add payment integration
- [ ] Implement order history
- [ ] Add wishlist functionality
- [ ] User profile editing
- [ ] Product reviews and ratings
- [ ] Advanced filtering options
- [ ] Dark mode support
- [ ] PWA capabilities
- [ ] Unit and integration tests
- [ ] Backend API integration

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created as a learning project for React, Redux, and modern web development practices.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Last Updated**: February 2026
**Version**: 1.0.0
