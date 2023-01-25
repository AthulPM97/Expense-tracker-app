import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

const DailyExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const expenseData = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    setExpenses(() => {
      return [...expenses, expenseData];
    });
  };
  const addedExpenses = expenses.map((expense) => {
    return (
      <Container className="mt-3 mb-3 border">
        <ExpenseItem expense={expense} />
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
          <Button type="submit" variant="primary" className="mb-3">
            Add Expense
          </Button>
        </Form>
      </Container>
      {addedExpenses}
    </React.Fragment>
  );
};

export default DailyExpenses;
