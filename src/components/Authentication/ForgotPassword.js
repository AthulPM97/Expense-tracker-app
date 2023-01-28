import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  //history
  const history = useHistory();

  //refs
  const emailRef = useRef();

  //states
  const [isLoading, setIsLoading] = useState(false);

  //handlers
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    setIsLoading(true);
    
    //reset password api call
    const resetEmail = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            }),
          }
        );
        if (response.ok) {
          setIsLoading(false);
          const data = await response.json();
          alert(`Reset mail sent to ${data.email}`);
          history.push("/login");
        }
      } catch (err) {
        alert("Error resetting password: " + err.message);
      }
    };
    resetEmail();
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <Row>
          <Col xs={12}>
            <div className="p-3 bg-light rounded">
              <div className="text-center mb-3">
                <h3>Enter registered Email</h3>
              </div>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Send Link
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ForgotPassword;
