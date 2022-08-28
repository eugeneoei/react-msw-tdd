import { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "../hooks/useInitialisation";

export interface ILoggedInUserContext {
    loggedInUser: UserProfile | undefined;
    updateUser: (user: UserProfile) => void;
}

const LoggedInUserContext = createContext<ILoggedInUserContext | undefined>(undefined);

const LoggedInUserProvider = ({ children }: { children: ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<UserProfile | undefined>(undefined);

    const updateUser = (user: UserProfile) => {
        setLoggedInUser(user);
    };

    const value = {
        loggedInUser,
        updateUser
    };

    return (
        <LoggedInUserContext.Provider value={value}>
            {children}
        </LoggedInUserContext.Provider>
    );
};

const useLoggedInUser = () => {
    const context = useContext(LoggedInUserContext);
    if (context === undefined) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
};

export { LoggedInUserProvider, useLoggedInUser };
