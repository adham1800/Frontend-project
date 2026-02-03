import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.users.selected);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [dispatch, id]);

  if (!user) {
    return (
      <Container className="mt-5">
        <p>Loading user details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate("/users")} className="mb-3">
        Back to Users
      </Button>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            {user.firstName} {user.lastName}
          </h2>

          <div className="mt-3">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            {user.address && (
              <p>
                <strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}
              </p>
            )}
            {user.company && (
              <p>
                <strong>Company:</strong> {user.company.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserDetails;
