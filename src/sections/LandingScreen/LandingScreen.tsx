import "./LandingScreen.css"
import pcPanel from "../../assets/PCTowerFrontFacing.png"

function LandingScreen() {
    return (
        <div
            className="landing-screen"
            style={{ backgroundImage: `url(${pcPanel})` }}
        >
        </div>
    );
}

export default LandingScreen;