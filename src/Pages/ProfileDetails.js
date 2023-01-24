import { useContext, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const ProfileDetails = () => {
  const authCtx = useContext(AuthContext);

  const nameRef = useRef();
  const photoUrlRef = useRef();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          nameRef.current.value = data.users[0].displayName;
          photoUrlRef.current.value = data.users[0].photoUrl;
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoUrlRef.current.value;

    const updateDetails = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              displayName: enteredName,
              photoUrl: enteredPhotoUrl,
              returnSecureToken: true,
            }),
          }
        );
        if (response.ok) {
          console.log("Updated user details");
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateDetails();
  };
  return (
    <Container className="mt-3 border">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Full name: </Form.Label>
          <Form.Control type="text" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Photo URL: </Form.Label>
          <Form.Control type="text" ref={photoUrlRef} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileDetails;
