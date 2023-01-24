import { useRef } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (event) => {
    console.log("submitted");
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!enteredEmail.includes("@")) {
      alert("Enter a valid Email");
    }
    if (enteredPassword.length < 6) {
      alert("Enter a valid password");
    }
    if (enteredPassword !== confirmPassword) {
      alert("Passwords do not match!");
    }

    const signUp = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", JSON.stringify(data.idToken));
          console.log("User has successfully signed up");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    };

    signUp();
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col xs={12}>
          <div className="p-3 bg-light rounded">
            <div className="text-center mb-3">
              <h3>Sign Up</h3>
            </div>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  ref={passwordRef}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
