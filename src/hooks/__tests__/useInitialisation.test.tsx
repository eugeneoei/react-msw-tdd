import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../msw/browser";
import { useInitialisation } from "../useInitialisation";

describe("useInitialisation hook", () => {
    describe("isLoading", () => {
        it("should return true on load and false when initialisation completes", async () => {
            const { result } = renderHook(() => useInitialisation());

            expect(result.current.isLoading).toBe(true);
            // * need to assert change in state otherwise warning
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });
        });
    });

    describe("user", () => {
        it("should return undefined on load and user profile when initialisation completes", async () => {
            const expected = {
                firstName: "Jennie",
                lastName: "Nichols",
                email: "jennie.nichols@example.com",
                avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            };

            const { result } = renderHook(() => useInitialisation());

            expect(result.current.user).toBeUndefined();
            await waitFor(() => {
                expect(result.current.user).toEqual(expected);
            });
        });
    });

    describe("error", () => {
        it("should return undefined on load and 'An error occurred.' when initialisation fails", async () => {
            const expected = "An error occurred.";
            server.use(
                // override /auth request handler
                rest.get(
                    `${process.env.REACT_APP_API}/auth`,
                    (req, res, ctx) => {
                        return res(
                            ctx.status(400),
                            ctx.text("An error occurred.")
                        );
                    }
                )
            );

            const { result } = renderHook(() => useInitialisation());

            expect(result.current.errorMessage).toBeUndefined();
            await waitFor(() => {
                expect(result.current.errorMessage).toEqual(expected);
            });
        });
    });
});
