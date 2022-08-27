import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App initialisation", () => {
    it("should display spinner on load", () => {
        render(<App />);
        const spinner = screen.getByRole("progressbar");
        expect(spinner).toBeInTheDocument();
    });

    it('should display "done initialising" message after initialisation process completes', async () => {
        render(<App />);
        // * https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
        await waitFor(
            () => {
                const message = screen.getByText(/done initialising/i);
                expect(message).toBeInTheDocument();
            },
            {
                timeout: 3000
            }
        );
    });
});
