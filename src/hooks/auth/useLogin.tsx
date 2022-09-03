import { useState } from "react";
import { UserProfile } from "../../interfaces/userProfile";
import axios from "axios";

interface IUseLoginResponse {
    // user: UserProfile | undefined;
    login: (email: string, password: string) => Promise<UserProfile>;
    isLoginLoading: boolean;
    loginError: string | undefined;
}

const useLogin = (): IUseLoginResponse => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError] = useState<string | undefined>(undefined);
    // const [user, setUser] = useState<UserProfile | undefined>(undefined);

    const login = async (email: string, password: string) => {
        // console.log("useLogin hook loggin in function");
        setIsLoginLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/login`,
                {
                    email,
                    password
                }
            );
            // console.log(response.data);
            // setUser(response.data);
            setIsLoginLoading(false);
            return response.data
        } catch (error) {
            // console.log(error.response.data)
        }
        // setTimeout(async () => {
        // }, 1000);
    };

    // return { user, login, isLoginLoading, loginError };
    return { login, isLoginLoading, loginError };
};

export { useLogin };
