import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../msw/browser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoggedInUserProvider } from "../../../contexts/auth/useLoggedInUser";
import { Login } from "../Login";
import { PageLayout } from "../../../components/layouts/PageLayout";
import { Home } from "../../home/Home";
import { Initialisation } from "../../../components/layouts/Initialisation";
import { Register } from "../../register/Register";

const LoginComponentWithWrapper = () => (
    <LoggedInUserProvider>
        <Initialisation>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route element={<PageLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Initialisation>
    </LoggedInUserProvider>
);

beforeEach(() => {
    // because there is a user initialisation process,
    // we overwrite /auth endpoint so that user gets router to /login
    server.use(
        rest.get(`${process.env.REACT_APP_API}/auth`, (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("Session has expired."));
        })
    );
});

test("should display email and password input fields", async () => {
    render(<LoginComponentWithWrapper />);

    const emailInput = await screen.findByRole("textbox", { name: /email/i });
    const passwordInput = await screen.findByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test("login button should be enabled on load", async () => {
    render(<LoginComponentWithWrapper />);

    const loginButton = await screen.findByRole("button", { name: /login/i });

    expect(loginButton).toBeEnabled();
});

test("should show required error message for respective form fields when form is submitted without any values", async () => {
    render(<LoginComponentWithWrapper />);
    const loginButton = await screen.findByRole("button", { name: /login/i });
    userEvent.click(loginButton);

    const loginErrorMessage = await screen.findByText("Email is required.");
    const passwordErrorMessage = await screen.findByText(
        "Password is required."
    );

    expect(loginErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
});

test("should show spinner when form is submitted with valid field values", async () => {
    render(<LoginComponentWithWrapper />);
    const emailInput = await screen.findByRole("textbox", { name: /email/i });
    const passwordInput = (await screen.findByLabelText(
        /password/i
    )) as HTMLInputElement;
    const loginButton = await screen.findByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "tony.stark@avengers.com");
    await userEvent.type(passwordInput, "password1");
    userEvent.click(loginButton);

    const spinner = await screen.findByRole("progressbar");
    expect(spinner).toBeInTheDocument();
});

test("should route user to home page when login is successful", async () => {
    render(<LoginComponentWithWrapper />);

    const emailInput = await screen.findByRole("textbox", { name: /email/i });
    const passwordInput = await screen.findByLabelText(/password/i);
    const loginButton = await screen.findByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "jennie.nichols@example.com");
    await userEvent.type(passwordInput, "jennie.nichols@example.com");
    userEvent.click(loginButton);

    const navbar = await screen.findByRole("navigation");
    expect(navbar).toBeInTheDocument();
});

test("should show error message when login is not successful", async () => {
    server.use(
        rest.post(`${process.env.REACT_APP_API}/login`, (req, res, ctx) => {
            return res(ctx.status(400), ctx.text("Invalid email or password."));
        })
    );
    render(<LoginComponentWithWrapper />);

    const emailInput = await screen.findByRole("textbox", { name: /email/i });
    const passwordInput = await screen.findByLabelText(/password/i);
    const loginButton = await screen.findByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "jennie.nichols@example.com");
    await userEvent.type(passwordInput, "jennie.nichols@example.com");
    userEvent.click(loginButton);

    const error = await screen.findByRole("alert");
    expect(error).toBeInTheDocument();
});

test("should route user to register page when link is clicked", async () => {
    render(<LoginComponentWithWrapper />);
    const registerLink = await screen.findByRole("link", { name: /here/i });
    userEvent.click(registerLink);

    const registerHeader = await screen.findByRole("heading", {
        name: /register/i
    });
    expect(registerHeader).toBeInTheDocument();
});
