import { useState } from "react";
import { IRegister } from "../../interfaces/forms/register";
import axios from "axios";

interface IUseRegister {
    registerUser: ({ firstName, lastName, email, password }: IRegister) => void;
    isRegisterLoading: boolean;
    registrationError: string | undefined;
}

const useRegister = (): IUseRegister => {
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState<string | undefined>(undefined);

    const registerUser = async ({
        firstName,
        lastName,
        email,
        password
    }: IRegister) => {
        setIsRegisterLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API}/register`, {
                firstName,
                lastName,
                email,
                password
            });
        } catch (error) {
            setRegistrationError(error.response.data);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return { registerUser, isRegisterLoading, registrationError };
};

export { useRegister };
