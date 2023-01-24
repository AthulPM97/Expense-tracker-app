import { useContext, useRef } from "react";
import { Col, Container, Row, Form, Button, NavLink } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const SignIn = (props) => {

  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (!enteredEmail.includes("@")) {
      alert("Enter a valid Email");
    }
    if (enteredPassword.length < 6) {
      alert("Enter a valid password");
    }
    const signIn = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
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
          authCtx.login(data.idToken);
          console.log("User has successfully signed in");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    };

    signIn();
  }

  const modeChangeHandler = () => {
    props.changeMode();
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
              <h3>Login</h3>
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

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Container className="text-center"><NavLink onClick={modeChangeHandler}>Don't have an account? Sign Up</NavLink></Container>
      </Row>
    </Container>
  );
};

export default SignIn;
