import "./LandingScreen.css"
import pcPanel from "../../assets/PCTowerFrontFacing.png"
import pcButton from "../../assets/pcButton.png"


function LandingScreen() {
    return (
        <div
            className="landing-screen"
            style={{ backgroundImage: `url(${pcPanel})` }}
        >
            <button
                onClick={() => console.log("LandingScreen")}
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