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
    "[  0.201455] Scanning boot devices...",
    "[  0.312890] Loading kernel modules",
    "[  0.355104] Starting udev device manager",
    "[  0.398217] Bringing up network interface eth0",
    "[  0.442556] Resolving hostname: rithishsivaraj.com",
    "[  0.501120] Establishing secure connection...",
    "[  0.612334] Checking system permissions...",
    "[  0.678901] All systems nominal",
];

const usePrintLines = (messageBlocks: string[], delayMs = 1000) => {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);

    useEffect(() => {
        setVisibleLines([]);
    }, [messageBlocks]);

    useEffect(() => {
        if (visibleLines.length >= messageBlocks.length) return;
        const timer = setTimeout(() => {
            setVisibleLines((prev) => [...prev, messageBlocks[prev.length]]);
        }, delayMs);

        return () => clearTimeout(timer);
    }, [visibleLines, messageBlocks, delayMs]);

    return visibleLines;
};


const asciiBanner = `██████╗ ██╗████████╗██╗  ██╗██╗███████╗██╗  ██╗         ██████╗ ███████╗
██╔══██╗██║╚══██╔══╝██║  ██║██║██╔════╝██║  ██║        ██╔═══██╗██╔════╝
██████╔╝██║   ██║   ███████║██║███████╗███████║ ██████ ██║   ██║███████╗
██╔══██╗██║   ██║   ██╔══██║██║╚════██║██╔══██║        ██║   ██║╚════██║
██║  ██║██║   ██║   ██║  ██║██║███████║██║  ██║        ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝         ╚═════╝ ╚══════╝`;

const asciiBannerLines = asciiBanner.split("\n");

function BootSequence({ onBootComplete }: BootSequenceProps) {
    const visibleBannerLines = usePrintLines(asciiBannerLines, 100);
    const displayLogs = usePrintLines(phase1, 800);

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
          <pre style={{ color: "#FFFFFF", fontFamily: "monospace" }}>
            {visibleBannerLines.join("\n")}
          </pre>
                    <div className="bootMessages">
                        {displayLogs.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                    <button onClick={onBootComplete}>Test: Complete Boot</button>
                </div>
            </div>
        </div>
    );
}

export default BootSequence;