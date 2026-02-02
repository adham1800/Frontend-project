import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers } from "../store/userSlice";
import UserCard from "../components/UserCard";
import UserPagination from "../components/UserPagination";
import { Container, Form, Row } from "react-bootstrap";

export const Users = () => {
  const dispatch = useDispatch();
  const { list, total } = useSelector((s) => s.users);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getUsers({ limit: 10, skip: page * 10 }));
  }, [dispatch, page]);

  return (
    <Container className="mt-4">
      <h2>Users</h2>

      <Form.Control
        className="my-3"
        placeholder="Search users..."
        onChange={(e) => dispatch(searchUsers(e.target.value))}
      />

      <Row>
        {list.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Row>

      <UserPagination total={total} setPage={setPage} />
    </Container>
  );
};
