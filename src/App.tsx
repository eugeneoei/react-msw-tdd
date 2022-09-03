import { Login } from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import {  PageLayout } from "./components/layouts/PageLayout";

import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { Initialisation } from "./components/layouts/Initialisation";

const App = () => {
    return (
        <LoggedInUserProvider>
            <Initialisation>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login />} />
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
