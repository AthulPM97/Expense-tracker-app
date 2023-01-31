import { useRef } from "react";
import { Col, Container, Row, Form, Button, NavLink } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const SignIn = (props) => {
  //history
  const history = useHistory();

  //refs
  const emailRef = useRef();
  const passwordRef = useRef();

  //store
  const dispatch = useDispatch();

  //handlers
  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    
    //validation
    if (!enteredEmail.includes("@")) {
      alert("Enter a valid Email");
    }
    if (enteredPassword.length < 6) {
      alert("Enter a valid password");
    }

    //login api call
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
          dispatch(authActions.login({token: data.idToken, email: data.email}));
          history.push('/complete-profile');
          localStorage.setItem('token', data.idToken);
          localStorage.setItem('uid', data.localId);

          console.log("User has successfully signed in");
        }
      } catch (err) {
        alert("Error signing in: " + err.message);
      }
    };

    signIn();
  };

  const forgotPasswordHandler = () => {
    history.push("/forgot-password");
  };

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
            <Form onSubmit={loginHandler}>
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

              <div className="text-center mb-2">
                <NavLink onClick={forgotPasswordHandler}>
                  Forgot password?
                </NavLink>
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Container className="text-center">
          <NavLink onClick={modeChangeHandler}>
            Don't have an account? Sign Up
          </NavLink>
        </Container>
      </Row>
    </Container>
  );
};

export default SignIn;
