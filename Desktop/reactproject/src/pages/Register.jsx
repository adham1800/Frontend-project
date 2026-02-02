import { Form, Button, Container, Alert } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="mt-5">
      <h2>Register</h2>
     

      <Form>
        <Form.Control className="mb-3" placeholder="Username" />
        <Form.Control className="mb-3" placeholder="Email" />
        <Form.Control type="password" className="mb-3" placeholder="Password" />
        <Button disabled>Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
