import { Outlet } from "react-router-dom";
import { UserProfile } from "../../interfaces/userProfile";
import { Navigate } from "react-router-dom";

interface IUser {
    user: UserProfile | undefined
}

const Page = ({ user }: IUser) => {

    if (user) {
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
