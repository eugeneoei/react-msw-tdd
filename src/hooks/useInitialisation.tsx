import axios from "axios";
import { useEffect, useState } from "react";
import { UserProfile } from '../interfaces/userProfile'

interface useInitialisationResponse {
    user?: UserProfile | undefined;
    isLoading: boolean;
    serverError?: string | undefined;
}

export const useInitialisation = (): useInitialisationResponse => {
    const [user, setUser] = useState<UserProfile | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [serverError, setServerError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/auth`
                );
                setUser(response.data);
            } catch (error: any) {
                if (error.response.status >= 500) {
                    setServerError(error.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, []);

    return { user, isLoading, serverError };
};
