import { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
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
            console.log('mail sent!')
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

  return (
    <Navbar bg="dark">
      <Button variant="danger" onClick={verifyMailHandler}>
        Verify email
      </Button>
    </Navbar>
  );
};

export default Navigationbar;
