import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Col md={4} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Button as={Link} to={`/users/${user.id}`}>
            View
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserCard;
