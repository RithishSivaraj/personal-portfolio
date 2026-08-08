import "./BootSequence.css"

interface BootSequenceProps {
    onBootComplete: () => void;
}

interface BootLine {
    text: string;
    delay: number;
}

const phase1: BootLine[] = [
    { text: "[  0.000000] rithishOS kernel v1.0.0 booting...", delay: 300 },
    { text: "[  0.041233] Detecting CPU cores... 8 found", delay: 300 },
    { text: "[  0.089421] Initializing memory management unit", delay: 300 },
    { text: "[  0.132018] Mounting root filesystem (ext4)", delay: 300 },
    { text: "[  0.201455] Scanning boot devices...", delay: 2500 }, // slow step
];


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
                        {phase1.map((line: BootLine, index: number) => (
                            <p key={index}>{line.text}</p>
                        ))}
                    </div>
                    <button onClick={onBootComplete}>Test: Complete Boot</button>
                </div>
            </div>
        </div>
    );
}

export default BootSequence;