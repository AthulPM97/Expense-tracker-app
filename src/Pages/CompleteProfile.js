import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CompleteProfile = () => {
  return (
    <Container className="container-fluid ">
      <Row className="mt-3">
        <Col className="alert w-100">Welcome to Expense Tracker!</Col>
        <Col className="alert w-100 alert-warning">Your profile is incomplete <NavLink to='/update-details'>Complete now</NavLink></Col>
      </Row>
    </Container>
  );
};

export default CompleteProfile;
