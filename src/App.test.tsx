import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "./msw/browser";
import App from "./App";

describe("App component", () => {
    describe("spinner", () => {
        it("should display spinner on load and disappear when initialisation process completes", async () => {
            render(<App />);
            const spinner = screen.getByRole("progressbar");
            expect(spinner).toBeInTheDocument();
            await waitFor(() => {
                expect(spinner).not.toBeInTheDocument();
            });
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

            const errorAlertOnLoad = screen.queryByRole("alert");
            expect(errorAlertOnLoad).not.toBeInTheDocument();

            let errorAlertOnComplete;
            await waitFor(async () => {
                errorAlertOnComplete = (await screen.findByRole(
                    "alert"
                )) as HTMLDivElement;
                expect(errorAlertOnComplete).toBeInTheDocument();
            });

            const errorMessage = screen.getByText(/An error occurred/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe("on successful initialisation", () => {
        it('should display "done initialising" message after initialisation process completes', async () => {
            render(<App />);
            // * https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
            await waitFor(() => {
                const message = screen.getByText(/done initialising/i);
                expect(message).toBeInTheDocument();
            });
        });
    })

});
