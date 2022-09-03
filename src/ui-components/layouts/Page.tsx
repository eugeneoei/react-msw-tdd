import { Outlet } from "react-router-dom";
// import { UserProfile } from "../../interfaces/userProfile";
import { Navigate } from "react-router-dom";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

// interface IUser {
//     user: UserProfile | undefined
// }

const Page = () => {

    const { loggedInUser } = useLoggedInUser()

    if (loggedInUser) {
        return (
            <div>
                <nav>My Navbar</nav>
                <Outlet />
            </div>
        );
    }

    return (
        <Navigate replace to="/login" />
    )
};

export { Page };
