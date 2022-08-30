import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../Login";

test("should display email and password input fields", () => {
    render(<Login />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("login button should be enabled on load", () => {
    render(<Login />);

    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeEnabled();
});

test("should show required error message for respective form fields when form is submitted without any values", async () => {
    render(<Login />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);

    const loginErrorMessage = await screen.findByText("Email is required.");
    const passwordErrorMessage = await screen.findByText(
        "Password is required."
    );

    expect(loginErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
});
