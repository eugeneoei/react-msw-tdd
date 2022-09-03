import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";

import { useLoggedInUser } from "../../contexts/auth/useLoggedInUser";
import { ReactNode } from "react";

interface IInitialisation {
    children: ReactNode;
}

const Initialisation = ({ children }: IInitialisation) => {
    const { isLoading, serverError } = useLoggedInUser();

    if (isLoading) {
        return (
            <div className="text-center">
                <span role="progressbar">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                    />
                </span>
            </div>
        );
    }

    if (serverError) {
        return (
            <div role="alert">
                <FontAwesomeIcon icon={faWarning} />
                <span>{serverError}</span>
            </div>
        );
    }

    return <>{children}</>;
};

export { Initialisation };
