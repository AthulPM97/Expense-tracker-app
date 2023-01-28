import { useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  //store
  const token = useSelector((state) => state.auth.idToken);

  //refs
  const nameRef = useRef();
  const photoUrlRef = useRef();

  //side effects
  useEffect(() => {
    //get stored details
    const getDetails = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          nameRef.current.value = data.users[0].displayName || "";
          photoUrlRef.current.value = data.users[0].photoUrl || "";
        }
      } catch (err) {
        alert("Error fetching user details: " + err.message);
      }
    };
    getDetails();
  }, []);

  //handlers
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoUrlRef.current.value;

    //update user details api call
    const updateDetails = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATUydlpf9f4eZ4Y0yMpb2SqFFUwup6HoA",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              displayName: enteredName,
              photoUrl: enteredPhotoUrl,
              returnSecureToken: true,
            }),
          }
        );
        if (response.ok) {
          console.log("User details updated");
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        alert("Error updating user details: " + err.message);
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
