import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "./ForgotPassword";

describe('forgot password page', () => {
    test('show enter email form', () => {
        //Arrange
        render(<ForgotPassword/>);

        //Act

        //Assert
        const outputPrompt = screen.getByText('Enter registered email', {exact: false});
        expect(outputPrompt).toBeInTheDocument();
    });
    test('show loading when "send link" button clicked', () => {
        //Arrange
        render(<ForgotPassword/>);

        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        //Assert
        const loadingElement = screen.getByText('Loading...', {exact: false});
        expect(loadingElement).toBeInTheDocument();
    });
    test('does not render "loading" when "send link" button is not clicked', () => {
        //Arrange
        render(<ForgotPassword/>);

        //Act
        const buttonElement = screen.getByRole('button');

        //Assert
        const loadingElement = screen.queryByText('Loading...', {exact: false});
        expect(loadingElement).toBeNull();
    });
});