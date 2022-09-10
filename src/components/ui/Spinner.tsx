import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
    return (
        <span role="progressbar">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        </span>
    );
};

export { Spinner };
