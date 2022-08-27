import { renderHook, waitFor } from "@testing-library/react";
import { useInitialisation, UserProfile } from "../useInitialisation";

describe("useInitialisation hook", () => {
    describe("isLoading", () => {
        it("should return true on load and false when initialisation completes", async () => {
            const { result } = renderHook(() => useInitialisation());

            expect(result.current.isLoading).toBe(true);
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });
        });
    });

    describe("user", () => {
        it("should return undefined on load and user profile when initialisation completes", async () => {
            const expected: UserProfile = {
                firstName: "Jennie",
                lastName: "Nichols",
                email: "jennie.nichols@example.com",
                avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            };

            const { result } = renderHook(() => useInitialisation());

            await waitFor(() => {
                expect(result.current.user).toEqual(expected);
            });

        });
    })

});
