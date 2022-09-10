import { render, screen } from "@testing-library/react";
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
