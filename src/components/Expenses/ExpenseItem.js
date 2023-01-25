import { Col, Container, Row } from "react-bootstrap";

const ExpenseItem = (props) => {
    return (
        <Container>
            <Row>
                <Col>${props.expense.amount}</Col>
                <Col>Description: {props.expense.description}</Col>
                <Col>Category: {props.expense.category}</Col>
            </Row>
        </Container>
    )
};

export default ExpenseItem;