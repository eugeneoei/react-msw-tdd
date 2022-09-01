import axios from "axios";
import { useEffect, useState } from "react";
import { UserProfile } from '../interfaces/userProfile'

// export interface UserProfile {
//     firstName: string;
//     lastName: string;
//     email: string;
//     avatar: string;
// }

interface useInitialisationResponse {
    user?: UserProfile | undefined;
    isLoading: boolean;
    errorMessage?: string | undefined;
}

export const useInitialisation = (): useInitialisationResponse => {
    const [user, setUser] = useState<UserProfile | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/auth`
                );
                setUser(response.data);
            } catch (error: any) {
                // console.log(error)
                setErrorMessage(error.response.data);
            } finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, []);

    return { user, isLoading, errorMessage };
};
