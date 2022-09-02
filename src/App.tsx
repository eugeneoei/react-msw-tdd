import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useInitialisation } from "./hooks/useInitialisation";

import { Login } from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";

const App = () => {
    const { user, isLoading, errorMessage } = useInitialisation();

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

    if (errorMessage) {
        return (
            <div role="alert">
                <FontAwesomeIcon icon={faWarning} />
                <span>{errorMessage}</span>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
