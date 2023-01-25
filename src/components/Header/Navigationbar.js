import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const Navigationbar = () => {
  const authCtx = useContext(AuthContext);

  const verifyMailHandler = () => {
    const verifyMail = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          console.log("mail sent!");
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    };

    verifyMail();
  };

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Nav.Link href="/daily-expenses">Daily Expenses</Nav.Link>
      </Nav>
      <Button variant="outline-warning" onClick={verifyMailHandler}>
        Verify email
      </Button>
      <Container>
        <Button variant="danger" onClick={logoutHandler}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
