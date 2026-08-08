import "./LandingScreen.css"
import pcPanel from "../../assets/PCTowerFrontFacing.png"
import pcButton from "../../assets/pcButton.png"

interface LandingScreenProps {
    onPowerOn: () => void;
}


function LandingScreen({ onPowerOn }: LandingScreenProps) {
    return (
        <div
            className="landing-screen"
            style={{ backgroundImage: `url(${pcPanel})` }}
        >
            <button
                onClick={onPowerOn}
                type="button"
                className="landing-screen-button"
            ><img
                    src={pcButton}
                    alt="Power on"
                    className="landing-screen-button-icon"
                />
            </button>
        </div>
    );
}

export default LandingScreen;