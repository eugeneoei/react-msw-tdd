import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "../Register";

test("should display first name, last name, email and password input fields", () => {
    render(<Register />);

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
});

test("register button should be enabled on load", () => {
    render(<Register />);

    const registerButton = screen.getByRole("button", { name: /register/i });

    expect(registerButton).toBeEnabled();
});

test("should show required error message for respective form fields when form is submitted without any values", async () => {
    render(<Register />);

    const registerButton = screen.getByRole("button", { name: /register/i });
    userEvent.click(registerButton);

    const firstNameErrorMessage = await screen.findByText(
        "First name is required."
    );
    const lastNameErrorMessage = await screen.findByText(
        "Last name is required."
    );
    const emailErrorMessage = await screen.findByText("Email is required.");
    const passwordErrorMessage = await screen.findByText(
        "Password is required."
    );
    const confirmPasswordErrorMessage = await screen.findByText(
        "Confirm password is required."
    );

    expect(firstNameErrorMessage).toBeInTheDocument();
    expect(lastNameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
    expect(confirmPasswordErrorMessage).toBeInTheDocument();
});
