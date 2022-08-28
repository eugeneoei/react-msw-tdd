import { render, waitFor } from "@testing-library/react";
// import { UserProfile } from "../../hooks/useInitialisation";
// import { ReactNode } from "react";
import {
    ILoggedInUserContext,
    LoggedInUserProvider,
    useLoggedInUser
} from "../useLoggedInUser";

// interface Children {
//     children: ReactNode
// }

describe("useLoggedInUserContext", () => {
    // describe("LoggedInUserProvider", () => {
    //     it("should have provider its properties to its children", () => {
    //         const providerProperties = {
    //             firstName: "Tony",
    //             lastName: "Stark"
    //         }
    //         const ChildrenComponent = (
    //             <div>
    //                 <p></p>
    //                 <p></p>
    //             </div>
    //         )
    //         const wrapper = ({ children } : Children) => (
    //             <LoggedInUserProvider value={providerProperties}>
    //                 {children}
    //             </LoggedInUserProvider>
    //         );

    //         render(<LoggedInUserProvider />);
    //     });
    // });

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
