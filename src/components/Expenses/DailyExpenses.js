import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expenses";
import ExpenseItem from "./ExpenseItem";

const DailyExpenses = () => {
  //store
  const expenses = useSelector((state) => state.expenses.expenses);
  console.log(expenses);
  const dispatch = useDispatch();

  //states
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState("");

  //side effects
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-26c78-default-rtdb.firebaseio.com/expenses.json"
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const keys = Object.keys(data);
            keys.forEach((key) => {
              const expenseWithId = {
                ...data[key],
                id: key,
              };
              dispatch(expensesActions.fetchExpenses(expenseWithId));
            });
          } else {
            dispatch(expensesActions.emptyExpenses());
          }
        }
      } catch (err) {
        alert("Error fetching expenses: " + err.message);
      }
    };
    getExpenses();
  }, []);

  //refs
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  //handlers
  const addExpenseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    console.log(enteredCategory);

    //add expense api caller
    const postExpenseData = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-26c78-default-rtdb.firebaseio.com/expenses.json",
          {
            method: "POST",
            body: JSON.stringify({
              amount: enteredAmount,
              description: enteredDescription,
              category: enteredCategory,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const expenseData = {
            id: data.name,
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory,
          };
          dispatch(expensesActions.addExpense(expenseData));
        }
      } catch (err) {
        alert("Error adding expense: " + err.message);
      }
    };
    postExpenseData();
  };

  //event on edit btn click
  const editHandler = (item) => {
    console.log(item);
    setEditItemId(item.id);
    //prefill boxes
    amountRef.current.value = item.amount;
    descriptionRef.current.value = item.description;
    categoryRef.current.value = item.category;
    //set editing mode
    setIsEditing(true);
  };
  //event on submit btn click
  const editedExpenseSubmitHandler = () => {
    const editedAmount = amountRef.current.value;
    const editedDescription = descriptionRef.current.value;
    const editedCategory = categoryRef.current.value;

    const putExpense = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-26c78-default-rtdb.firebaseio.com/expenses/${editItemId}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              amount: editedAmount,
              description: editedDescription,
              category: editedCategory,
            }),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if (response.ok) {
          setIsEditing(false);
          amountRef.current.value = "";
          descriptionRef.current.value = "";
          categoryRef.current.value = "Select category";
        }
      } catch (err) {
        alert("Error editing expense: " + err.message);
      }
    };
    putExpense();
  };

  const addedExpenses = expenses.map((expense) => {
    return (
      <Container className="mt-3 mb-3 border" key={expense.id}>
        <ExpenseItem expense={expense} onEdit={editHandler} />
      </Container>
    );
  });

  return (
    <React.Fragment>
      <Container className=" align-items-center justify-content-center border">
        <Form onSubmit={addExpenseHandler}>
          <div className="text-center mb-3">
            <h3>Add Expense Details</h3>
          </div>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" ref={amountRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" ref={descriptionRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select ref={categoryRef}>
              <option>Select category</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
            </Form.Select>
          </Form.Group>
          {!isEditing && (
            <Button type="submit" variant="primary" className="mb-3">
              Add Expense
            </Button>
          )}
          {isEditing && (
            <Button variant="primary" onClick={editedExpenseSubmitHandler}>
              Submit
            </Button>
          )}
        </Form>
      </Container>
      {addedExpenses}
    </React.Fragment>
  );
};

export default DailyExpenses;
