import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

export const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.users.selected);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  if (!user) return null;

  return (
    <Container className="mt-4">
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Phone: {user.phone}</p>
      <p>Age: {user.age}</p>
    </Container>
  );
};
