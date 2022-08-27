import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App initialisation", () => {
    it("should display spinner on load", () => {
        render(<App />);
        const spinner = screen.getByRole("progressbar");
        expect(spinner).toBeInTheDocument();
    });
});
