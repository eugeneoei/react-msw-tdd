import { useState } from "react";
import { UserProfile } from "../../interfaces/userProfile";
import axios from "axios";

interface IUseLoginResponse {
    login: (email: string, password: string) => Promise<UserProfile>;
    isLoginLoading: boolean;
    loginError: string | undefined;
}

const useLogin = (): IUseLoginResponse => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError] = useState<string | undefined>(undefined);

    const login = async (email: string, password: string) => {
        setIsLoginLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/login`,
                {
                    email,
                    password
                }
            );
            setIsLoginLoading(false);
            return response.data
        } catch (error) {
            console.log(error.response.data)
        }
    };

    return { login, isLoginLoading, loginError };
};

export { useLogin };
