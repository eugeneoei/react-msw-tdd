import { Login } from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import {  PageLayout } from "./components/layouts/PageLayout";

import { LoggedInUserProvider } from "./contexts/auth/useLoggedInUser";
import { Initialisation } from "./components/layouts/Initialisation";
import { Register } from "./pages/register/Register";

const App = () => {
    return (
        <LoggedInUserProvider>
            <Initialisation>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route element={<PageLayout />}>
                            <Route index element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Initialisation>
        </LoggedInUserProvider>
    );
};

export default App;
