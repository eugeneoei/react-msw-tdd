import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

const App = () => {
    const [isInitialising, seItInitialising] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            // console.log(await axios.get(`${process.env.REACT_APP_API}/auth`))
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
