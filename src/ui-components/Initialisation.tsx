import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
// import { useInitialisation } from "../hooks/useInitialisation";

import { useLoggedInUser } from "../contexts/useLoggedInUser";

const Initialisation = () => {
    // const { user, isLoading, serverError } = useInitialisation();
    const { isLoading, serverError } = useLoggedInUser()

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
}

export { Initialisation }