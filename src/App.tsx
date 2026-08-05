// import PowerOnScreen from '../assets/PCTowerFrontFacing.png'
import { useState } from "react";
import LandingScreen from "./sections/LandingScreen/LandingScreen.tsx";
import BootSequence from "./components/BootSequence/BootSequence.tsx";

type Screen = "landing" | "booting" | "site";

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("landing");

    const handlePowerOn = () => {
        setCurrentScreen("booting");
    };

    const handleBootComplete = () => {
        setCurrentScreen("site");
    };

    return (
        <div>
            {currentScreen === "landing" && (
                <LandingScreen onPowerOn={handlePowerOn} />
            )}

            {currentScreen === "booting" && (
                <BootSequence onBootComplete={handleBootComplete} />
            )}

            {currentScreen === "site" && (
                <div>Site coming soon</div>
            )}
        </div>
    );
}

export default App;
