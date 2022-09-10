import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { loginSchema } from "../../schemas/loginSchema";
import { ILoginForm } from "../../interfaces/forms/loginForm";
import { AlertInput } from "../../components/ui/AlertInput";
import { useLogin } from "../../hooks/auth/useLogin";
import { useLoggedInUser } from "../../contexts/auth/useLoggedInUser";
import { AlertSnackbar } from "../../components/ui/AlertSnackbar";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema)
    });

    const { login, isLoginLoading, loginError } = useLogin();
    const { loggedInUser, updateUser } = useLoggedInUser();

    const handleLogin = async (data: ILoginForm) => {
        const user = await login(data.email, data.password);
        updateUser(user);
    };

    // console.log(errors)

    if (loggedInUser) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="my-12 mx-auto max-w-sm">
            <div className="shadow-2xl bg-slate-100 p-12 rounded-xl">
                <h3 className="text-xl text-center font-bold tracking-wider">
                    Login
                </h3>
                {loginError && !isLoginLoading && (
                    <AlertSnackbar message={loginError} />
                )}
                <form onSubmit={handleSubmit(handleLogin)}>
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
                    <div className="mt-6">
                        {isLoginLoading ? (
                            <span role="progressbar">
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin"
                                />
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-sky-700 rounded text-white p-4"
                            >
                                Login
                            </button>
                        )}
                    </div>
                    <div className="mt-6 text-center">
                        Already have an account? Click{" "}
                        <Link to="/register" className="underline hover:opacity-40">here</Link> to register an account.
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Login };
