import { render, waitFor } from "@testing-library/react";
import {
    ILoggedInUserContext,
    LoggedInUserProvider,
    useLoggedInUser
} from "../useLoggedInUser";

describe("useLoggedInUserContext", () => {

    describe("loggedInUser", () => {
        it("should be undefined on load", async () => {
            let loggedInUser;
            const TestComponent = () => {
                const context = useLoggedInUser();
                loggedInUser = context.loggedInUser;
                return <div>Something</div>;
            };
            render(
                <LoggedInUserProvider>
                    <TestComponent />
                </LoggedInUserProvider>
            );

            expect(loggedInUser).not.toBeDefined();
        });

        it("should return user information when it is updated", async () => {
            let loggedInUserContext: ILoggedInUserContext;
            const user = {
                firstName: "Jennie",
                lastName: "Nichols",
                email: "jennie.nichols@example.com",
                avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            };

            const TestComponent = () => {
                loggedInUserContext = useLoggedInUser();
                return <div>Something</div>;
            };
            render(
                <LoggedInUserProvider>
                    <TestComponent />
                </LoggedInUserProvider>
            );

            await waitFor(() => {
                const { loggedInUser, updateUser } = loggedInUserContext;
                updateUser(user);
                expect(loggedInUser).toEqual(user);
            });
        });
    });
});
