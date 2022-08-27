import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const App = () => {
    const [isInitialising, seItInitialising] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            seItInitialising(false);
        }, 500);
    }, []);

    if (isInitialising) {
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

    return <p>done initialising</p>;
};

export default App;
