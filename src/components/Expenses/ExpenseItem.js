import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expenses";

const ExpenseItem = (props) => {
  //store
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.userID);

  //handlers
  const deleteItemHandler = (id) => {
    const deleteData = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-26c78-default-rtdb.firebaseio.com/expenses/${userID}/${id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          dispatch(expensesActions.deleteExpense(id));
          console.log("Expense successfully deleted");
        }
      } catch (err) {
        alert(err.message);
      }
    };
    deleteData();
  };

  const editItemHandler = (item) => {
    props.onEdit(item);
  };
  return (
    <Container>
      <Row>
        <Col>Rs.{props.expense.amount}</Col>
        <Col>Description: {props.expense.description}</Col>
        <Col>Category: {props.expense.category}</Col>
        <Col>
          <Button
            variant="outline-primary"
            onClick={editItemHandler.bind(null, props.expense)}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            onClick={deleteItemHandler.bind(null, props.expense.id)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseItem;
