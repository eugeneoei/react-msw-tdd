import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../Login";

test("should display email and password input fields", () => {
    render(<Login loggedInUser={undefined}/>);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("login button should be enabled on load", () => {
    render(<Login loggedInUser={undefined}/>);

    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeEnabled();
});

test("should show required error message for respective form fields when form is submitted without any values", async () => {
    render(<Login loggedInUser={undefined}/>);
    const loginButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(loginButton);

    const loginErrorMessage = await screen.findByText("Email is required.");
    const passwordErrorMessage = await screen.findByText(
        "Password is required."
    );

    expect(loginErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
});

test("should show spinner when form is submitted with valid field values", async () => {
    render(<Login loggedInUser={undefined}/>);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "tony.start@avengers.com");
    await userEvent.type(passwordInput, "password1");
    userEvent.click(loginButton);

    const spinner = await screen.findByRole("progressbar");
    expect(spinner).toBeInTheDocument();
});

test("should route user to home page when login is successful", async () => {
    render(<Login loggedInUser={undefined}/>);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "jennie.nichols@example.com");
    await userEvent.type(passwordInput, "jennie.nichols@example.com");
    userEvent.click(loginButton);

    const homepageHeader = await screen.findByRole("heading", {
        name: "Hello World"
    });
    expect(homepageHeader).toBeInTheDocument();
});
