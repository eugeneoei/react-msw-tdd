import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthFormLayout } from "../../components/layouts/AuthFormLayout";
import { Button } from "../../components/ui/Button";
import { registerSchema } from "../../schemas/registerSchema";
import { IRegisterForm } from "../../interfaces/forms/registerForm";
import { AlertInput } from "../../components/ui/AlertInput";

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegisterForm>({
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: IRegisterForm) => {
        console.log(data)
        // const user = await login(data.email, data.password);
    };

    return (
        <AuthFormLayout>
            <h3 className="text-xl text-center font-bold tracking-wider">
                Register
            </h3>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mt-4">
                    <label htmlFor="firstName" className="block">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        defaultValue=""
                        {...register("firstName")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.firstName && (
                        <AlertInput message={errors.firstName.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="lastName" className="block">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        defaultValue=""
                        {...register("lastName")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.lastName && (
                        <AlertInput message={errors.lastName.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        defaultValue=""
                        {...register("email")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.email && (
                        <AlertInput message={errors.email.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        defaultValue=""
                        {...register("password")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.password && (
                        <AlertInput message={errors.password.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="block">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        defaultValue=""
                        {...register("confirmPassword")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.confirmPassword && (
                        <AlertInput message={errors.confirmPassword.message} />
                    )}
                </div>
                <div className="mt-6">
                    {/* {isLoginLoading ? <Spinner /> : <Button text="Login" />} */}
                    <Button text="Register" />
                </div>
                {/*
                <div className="mt-6 text-center">
                    Already have an account? Click{" "}
                    <Link to="/register" className="underline hover:opacity-40">
                        here
                    </Link>{" "}
                    to register an account.
                </div> */}
            </form>
        </AuthFormLayout>
    );
};

export { Register };
    function login(email: any, password: any) {
        throw new Error("Function not implemented.");
    }

