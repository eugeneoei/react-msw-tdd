import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { loginSchema } from "../../schemas/loginSchema";
import { ILoginForm } from "../../interfaces/forms/loginForm";
import { AlertInput } from "../../ui-components/AlertInput";
import { useLogin } from "../../hooks/auth/useLogin";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema)
    });

    const { user, login, isLoginLoading, loginError } = useLogin()

    const handleLogin = (data: ILoginForm) => {
        login(data.email, data.password)
        console.log('>>', data);
    };

    // console.log(errors);

    return (
        <div className="my-12 mx-auto max-w-sm">
            <div className="shadow-2xl bg-slate-100 p-12 rounded-xl">
                <h3 className="text-xl text-center font-bold tracking-wider">Login</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
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
                            {...register("password")}
                            className="block w-full mt-2 p-2 rounded"
                        />
                        {errors.password && (
                            <AlertInput message={errors.password.message} />
                        )}
                    </div>
                    <div className="mt-6">
                        {
                            isLoginLoading ? (
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
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Login };
