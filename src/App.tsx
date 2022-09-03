import { Login } from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Page } from "./components/layouts/Page";

import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { Initialisation } from "./components/Initialisation";

const App = () => {
    return (
        <LoggedInUserProvider>
            <Initialisation>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route element={<Page />}>
                            <Route index element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Initialisation>
        </LoggedInUserProvider>
    );
};

export default App;
