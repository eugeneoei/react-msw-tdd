import {
    render,
    screen,
    waitForElementToBeRemoved
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "./msw/browser";
import App from "./App";

test("spinner should display on load and disappear when user initialisation process completes", async () => {
    render(<App />);
    let spinner;
    spinner = screen.getByRole("progressbar");

    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);
    expect(spinner).not.toBeInTheDocument();
});

test("error should not exist on load and exist only when server error", async () => {
    server.use(
        rest.get(`${process.env.REACT_APP_API}/auth`, (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.delay(100),
                ctx.json({
                    message: "An error occurred."
                })
            );
        })
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

test("should redirect user to login page if user initialisation fails", async () => {
    server.use(
        rest.get(`${process.env.REACT_APP_API}/auth`, (req, res, ctx) => {
            return res(
                ctx.status(400),
                ctx.json({
                    message: "Session has expired."
                })
            );
        })
    );
    render(<App />);

    const login = await screen.findByRole("heading", {
        name: "Login"
    });
    expect(login).toBeInTheDocument();
});

test("should display navbar if user initialisation is successful", async () => {
    render(<App />);

    const navigation = await screen.findByRole("navigation");
    expect(navigation).toBeInTheDocument();
});
