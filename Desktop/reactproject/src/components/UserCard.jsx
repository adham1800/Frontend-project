import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Col md={4} className="mb-3">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Text className="text-muted">@{user.username}</Card.Text>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Phone:</strong> {user.phone}
          </Card.Text>
          <Card.Text>
            <strong>Age:</strong> {user.age}
          </Card.Text>
          <Button as={Link} to={`/users/${user.id}`} className="mt-2">
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserCard;
