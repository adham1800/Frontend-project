import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
    );

    if (result.type === registerUser.fulfilled.type) {
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passRef.current.value = "";
      navigate("/login");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Control
          className="mb-3"
          placeholder="Username"
          ref={usernameRef}
          required
        />
        <Form.Control
          type="email"
          className="mb-3"
          placeholder="Email"
          ref={emailRef}
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
          {loading ? "Loading..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;

