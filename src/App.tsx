import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useInitialisation } from "./hooks/useInitialisation";

import { Login } from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Page } from "./ui-components/layouts/Page";

import { LoggedInUserProvider } from "./contexts/useLoggedInUser";

const App = () => {
    const { user, isLoading, serverError } = useInitialisation();

    if (isLoading) {
        return (
            <div className="text-center">
                <span role="progressbar">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                    />
                </span>
            </div>
        );
    }

    if (serverError) {
        return (
            <div role="alert">
                <FontAwesomeIcon icon={faWarning} />
                <span>{serverError}</span>
            </div>
        );
    }

    return (
        <LoggedInUserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login loggedInUser={user}/>} />
                    <Route element={<Page user={user}/>}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LoggedInUserProvider>
    );
};

export default App;
