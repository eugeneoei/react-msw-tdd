import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function App() {
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

export default App;
