import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface IAlertSnackbar {
    message: string;
}

const AlertSnackbar = ({ message }: IAlertSnackbar) => {
    return (
        <div role="alert" className=" bg-red-200/50 mt-4 p-2 rounded-lg">
            <FontAwesomeIcon icon={faCircleExclamation} className="inline-block mr-2 text-red-600" />
            {message}
        </div>
    );
};

export { AlertSnackbar };
