import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface IAlertInput {
    message: string | undefined;
}

const AlertInput = ({ message }: IAlertInput) => {
    return (
        <div role="alert" className="mt-2 text-red-600">
            <FontAwesomeIcon icon={faCircleExclamation} className="inline-block mr-2" />
            {message}
        </div>
    );
};

export { AlertInput };
