import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { useInitialisation } from "./hooks/useInitialisation";

const App = () => {
    const { user, isLoading, errorMessage } = useInitialisation()

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

    if (errorMessage) {
        return (
            <div role="alert">
                <FontAwesomeIcon
                    icon={faWarning}
                />
                <span>{errorMessage}</span>
            </div>
        )
    }

    return <p>done initialising</p>;
};

export default App;
