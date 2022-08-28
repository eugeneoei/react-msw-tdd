import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component", () => {

    describe('spinner', () => {
        it("should display spinner on load and disappear when initialisation process completes", async () => {
            render(<App />);
            const spinner = screen.getByRole("progressbar");
            expect(spinner).toBeInTheDocument();
            await waitFor(() => {
                expect(spinner).not.toBeInTheDocument()
            })
        });
    })


    it('should display "done initialising" message after initialisation process completes', async () => {
        render(<App />);
        // * https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
        await waitFor(
            () => {
                const message = screen.getByText(/done initialising/i);
                expect(message).toBeInTheDocument();
            }
        );
    });
});
