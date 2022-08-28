import {
    render,
    screen,
    waitForElementToBeRemoved
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "./msw/browser";
import App from "./App";

describe("App component", () => {
    describe("spinner", () => {
        it("should display spinner on load and disappear when initialisation process completes", async () => {
            render(<App />);
            let spinner;
            spinner = screen.getByRole("progressbar");

            expect(spinner).toBeInTheDocument();
            await waitForElementToBeRemoved(spinner);
            expect(spinner).not.toBeInTheDocument();
        });
    });

    describe("error", () => {
        it("should not exist on load and exist only when error does not return undefined", async () => {
            server.use(
                rest.get(
                    `${process.env.REACT_APP_API}/auth`,
                    (req, res, ctx) => {
                        return res(
                            ctx.status(400),
                            ctx.json({
                                message: "An error occurred."
                            })
                        );
                    }
                )
            );

            render(<App />);
            let errorAlert;

            // at this point, we expect alert to not exist therefore, "query" command is used
            errorAlert = screen.queryByRole("alert");
            expect(errorAlert).not.toBeInTheDocument();

            // at this point, we expect alert to appear async therefore, "find" command is used
            errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toBeInTheDocument();

            const errorMessage = screen.getByText(/An error occurred/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe("on successful initialisation", () => {
        it('should display "done initialising" message after initialisation process completes', async () => {
            render(<App />);

            const message = await screen.findByText(/done initialising/i);
            expect(message).toBeInTheDocument();
        });
    });
});
