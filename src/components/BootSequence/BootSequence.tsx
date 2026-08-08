import "./BootSequence.css"
import { useState, useEffect } from 'react';

interface BootSequenceProps {
    onBootComplete: () => void;
}


const phase1 = [
    "[  0.000000] rithishOS kernel v1.0.0 booting...",
    "[  0.041233] Detecting CPU cores... 8 found",
    "[  0.089421] Initializing memory management unit",
    "[  0.132018] Mounting root filesystem (ext4)",
    "[  0.201455] Scanning boot devices...", // slow step
];


function PrintLines() {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (visibleCount < phase1.length) {
            const timer = setTimeout(() => {
                setVisibleCount(prev => prev + 1);
            }, 500); // half a second delay added.

            return () => clearTimeout(timer);
        }
    }, [visibleCount]);

    return (
        <div>
            {phase1.slice(0, visibleCount).map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
}


const asciiBanner = `██████╗ ██╗████████╗██╗  ██╗██╗███████╗██╗  ██╗         ██████╗ ███████╗
██╔══██╗██║╚══██╔══╝██║  ██║██║██╔════╝██║  ██║        ██╔═══██╗██╔════╝
██████╔╝██║   ██║   ███████║██║███████╗███████║ ██████ ██║   ██║███████╗
██╔══██╗██║   ██║   ██╔══██║██║╚════██║██╔══██║        ██║   ██║╚════██║
██║  ██║██║   ██║   ██║  ██║██║███████║██║  ██║        ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝         ╚═════╝ ╚══════╝`;



function BootSequence({ onBootComplete }: BootSequenceProps) {
    return (
        <div className="bootSequence-backdrop">
            <div className="terminal-window">
                <div className="terminal-title-bar">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="terminal-title-text">guest@rithishsivaraj: ~</span>
                </div>

                <div className="terminal-content">
                    <pre style={{ color: "#FFFFFF", fontFamily: "monospace" }}>{asciiBanner}</pre>
                    <div className="bootMessages">
                        {PrintLines()}
                    </div>
                    <button onClick={onBootComplete}>Test: Complete Boot</button>
                </div>
            </div>
        </div>
    );
}

export default BootSequence;