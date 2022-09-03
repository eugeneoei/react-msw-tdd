import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../Login";

import { LoggedInUserProvider } from "../../../contexts/useLoggedInUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "../../../ui-components/layouts/Page";
import { Home } from "../../home/Home";
// import { act } from "react-dom/test-utils";
// import { wait } from "@testing-library/user-event/dist/types/utils";

// test("should display email and password input fields", () => {
//     render(<Login />);

//     const emailInput = screen.getByRole("textbox", { name: /email/i });
//     const passwordInput = screen.getByLabelText(/password/i);

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
// });

// test("login button should be enabled on load", () => {
//     render(<Login />);

//     const loginButton = screen.getByRole("button", { name: /login/i });

//     expect(loginButton).toBeEnabled();
// });

// test("should show required error message for respective form fields when form is submitted without any values", async () => {
//     render(<Login />);
//     const loginButton = screen.getByRole("button", { name: /login/i });
//     userEvent.click(loginButton);

//     const loginErrorMessage = await screen.findByText("Email is required.");
//     const passwordErrorMessage = await screen.findByText(
//         "Password is required."
//     );

//     expect(loginErrorMessage).toBeInTheDocument();
//     expect(passwordErrorMessage).toBeInTheDocument();
// });

// test("should show spinner when form is submitted with valid field values", async () => {
//     render(<Login />);
//     const emailInput = screen.getByRole("textbox", { name: /email/i });
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByRole("button", { name: /login/i });

//     await userEvent.type(emailInput, "tony.start@avengers.com");
//     await userEvent.type(passwordInput, "password1");
//     userEvent.click(loginButton);

//     const spinner = await screen.findByRole("progressbar");
//     expect(spinner).toBeInTheDocument();
// });

test.only("should route user to home page when login is successful", async () => {
    render(
        <LoggedInUserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route element={<Page />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LoggedInUserProvider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "jennie.nichols@example.com");
    await userEvent.type(passwordInput, "jennie.nichols@example.com");
    userEvent.click(loginButton);

    const navbar = await screen.findByRole("navigation");
    expect(navbar).toBeInTheDocument();
});
