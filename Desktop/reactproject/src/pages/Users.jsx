import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers } from "../store/userSlice";
import UserCard from "../components/UserCard";
import UserPagination from "../components/UserPagination";
import { Container, Form, Row, Spinner } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const { list, total, loading, error } = useSelector((s) => s.users);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchUsers(searchQuery));
    } else {
      dispatch(getUsers({ limit: 10, skip: page * 10 }));
    }
  }, [dispatch, page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  if (error) {
    return (
      <Container className="mt-4">
        <p className="text-danger">Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Users</h2>

      <Form.Control
        className="my-3"
        placeholder="Search users by name or email..."
        onChange={handleSearch}
        value={searchQuery}
      />

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      <Row>
        {list && list.length > 0 ? (
          list.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          !loading && <p>No users found</p>
        )}
      </Row>

      {!searchQuery && list && list.length > 0 && <UserPagination total={total} setPage={setPage} />}
    </Container>
  );
};

export default Users;
