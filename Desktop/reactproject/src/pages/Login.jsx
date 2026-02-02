import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUser } from "../store/authSlice";
import { Form, Button, Alert, Container } from "react-bootstrap";

const Login = () => {
  const usernameRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      loginUser({
        username: usernameRef.current.value,
        password: passRef.current.value,
      })
    );

    dispatch(fetchUser());
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Control
          className="mb-3"
          placeholder="Username"
          ref={usernameRef}
          required
        />
        <Form.Control
          type="password"
          className="mb-3"
          placeholder="Password"
          ref={passRef}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
