import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { themeActions } from "../../store/theme";

const Navigationbar = () => {
  //history
  const history = useHistory();

  //store
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const premiumEligible = useSelector(
    (state) => state.expenses.premiumEligible
  );

  //handlers
  const verifyMailHandler = () => {
    const verifyMail = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: token,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          alert(`verification mail sent to ${data.email}`);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    };
    verifyMail();
  };

  const activatePremiumHandler = () => {
    dispatch(themeActions.switchTheme());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      {premiumEligible && (
        <Button variant="outline-success" onClick={activatePremiumHandler}>
          Activate Premium
        </Button>
      )}
      <Button variant="outline-warning" onClick={verifyMailHandler}>
        Verify email
      </Button>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/daily-expenses">Daily Expenses</Nav.Link>
        </Nav>
        <Container>
          <Button
            variant="danger"
            className="float-end"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
