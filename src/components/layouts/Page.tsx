import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

const Page = () => {
    const { loggedInUser } = useLoggedInUser();

    if (loggedInUser) {
        return (
            <div>
                <nav>My Navbar</nav>
                <Outlet />
            </div>
        );
    }

    return <Navigate replace to="/login" />;
};

export { Page };
