import "./BootSequence.css"
import { useState, useEffect, useRef } from 'react';

interface BootSequenceProps {
    onBootComplete: () => void;
}

interface BootLine {
    text: string;
    delay: number;
}

const phase1: BootLine[] = [
    { text: "##################################################", delay: 1300 },
    { text: "##################################################", delay: 2000 },
    { text: "  ", delay: 1300 },
    { text: "[  0.000000] rithishOS kernel v1.0.0 booting...", delay: 150 },
    { text: "[  0.041233] Detecting CPU cores... 8 found", delay: 150 },
    { text: "[  0.089421] Initializing memory management unit", delay: 150 },
    { text: "[  0.132018] Mounting root filesystem (ext4)", delay: 150 },
    { text: "[  0.201455] Scanning boot devices...", delay: 400 },
    { text: "--------------------------------------------------", delay: 100 },
    { text: "[  0.312890] Loading kernel modules", delay: 300 },
    { text: "[  0.355104] Taking fish for walk. Fish walked.", delay: 700 },
    { text: "[  0.398217] Bringing up network interface eth0", delay: 300 },
    { text: "[  0.442556] Resolving hostname: rithishsivaraj.com", delay: 300 },
    { text: "[  0.501120] Establishing secure connection...", delay: 2500 },
    { text: "[  3.001120] Connection established", delay: 300 },
    { text: "--------------------------------------------------", delay: 100 },
    { text: "[  3.056112] Checking system permissions...", delay: 300 },
    { text: "[  3.101445] Asked toaster for life advice. No response.", delay: 500 },
    { text: "[  3.144982] Indexing side projects... 4 found", delay: 400 },
    { text: "[  3.201337] Watered the plant. Plant unimpressed.", delay: 600 },
    { text: "[  3.267890] Counted USB ports twice to be sure", delay: 350 },
    { text: "[  3.312445] Reheated coffee for the third time", delay: 450 },
    { text: "--------------------------------------------------", delay: 100 },
    { text: "[  3.856201] Compiling personality traits...", delay: 1800 },
    { text: "[  5.656201] Personality compiled with 2 minor quirks", delay: 300 },
    { text: "[  5.702114] Loading resume.pdf into memory", delay: 300 },
    { text: "[  5.745887] Sock located. Its pair remains missing.", delay: 500 },
    { text: "[  5.801223] Practiced saying \"synergy\" unironically. Failed.", delay: 600 },
    { text: "[  5.867112] Debated cereal-vs-soup status. Inconclusive.", delay: 550 },
    { text: "--------------------------------------------------", delay: 100 },
    { text: "[  5.901990] Running final diagnostics...", delay: 2200 },
    { text: "[  8.101990] All systems nominal", delay: 300 },
    { text: "[  8.156712] Fish still walking. Going well.", delay: 400 },
    { text: "[  8.211337] Checked mirror. Still there.", delay: 350 },
    { text: "--------------------------------------------------", delay: 100 },
    { text: "[  8.401990] Finalizing user session...", delay: 1200 },
    { text: "[  9.601990] Session ready", delay: 300 },
    { text: "[  9.656712] Ready for user authentication", delay: 300 },
];

const phase2: BootLine[] = [
    { text: "> y", delay: 300 },
    { text: "[OK] Access granted.", delay: 500 },
    { text: "[  9.812004] Mounting user session for guest", delay: 400 },
    { text: "[  9.867221] Loading site preferences...", delay: 600 },
    { text: "Welcome, guest.", delay: 800 },
];

const usePrintLines = (messageBlocks: BootLine[], startWhenReady: boolean = true) => {
    const [visibleLines, setVisibleLines] = useState<BootLine[]>([]);

    useEffect(() => {
        setVisibleLines([]);
    }, [messageBlocks]);

    useEffect(() => {
        if (!startWhenReady) return;
        if (visibleLines.length >= messageBlocks.length) return;

        const nextLine = messageBlocks[visibleLines.length];
        const timer = setTimeout(() => {
            setVisibleLines((prev) => [...prev, nextLine]);
        }, nextLine.delay);

        return () => clearTimeout(timer);
    }, [visibleLines, messageBlocks, startWhenReady]);

    return visibleLines;
};

const asciiBanner = `██████╗ ██╗████████╗██╗  ██╗██╗███████╗██╗  ██╗         ██████╗ ███████╗
██╔══██╗██║╚══██╔══╝██║  ██║██║██╔════╝██║  ██║        ██╔═══██╗██╔════╝
██████╔╝██║   ██║   ███████║██║███████╗███████║ ██████ ██║   ██║███████╗
██╔══██╗██║   ██║   ██╔══██║██║╚════██║██╔══██║        ██║   ██║╚════██║
██║  ██║██║   ██║   ██║  ██║██║███████║██║  ██║        ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝         ╚═════╝ ╚══════╝`;

const asciiBannerLines: BootLine[] = asciiBanner
    .split("\n")
    .map((line) => ({ text: line, delay: 80 }));

type BootStage = "logs" | "prompt" | "granted" | "blank";

function BootSequence({ onBootComplete }: BootSequenceProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [bootStage, setBootStage] = useState<BootStage>("logs");
    const [inputBuffer, setInputBuffer] = useState("");

    const visibleBannerLines = usePrintLines(asciiBannerLines);
    const bannerDone = visibleBannerLines.length >= asciiBannerLines.length;

    const displayLogs = usePrintLines(phase1, bannerDone);
    const logsDone = displayLogs.length >= phase1.length;

    const displayPhase2 = usePrintLines(phase2, bootStage === "granted");
    const phase2Done = displayPhase2.length >= phase2.length;

    // logs -> prompt
    useEffect(() => {
        if (logsDone && bootStage === "logs") {
            setBootStage("prompt");
        }
    }, [logsDone, bootStage]);

    // prompt -> granted (types "y" then presses Enter)
    useEffect(() => {
        if (bootStage !== "prompt") return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (inputBuffer.trim().toLowerCase() === "y") {
                    setBootStage("granted");
                } else {
                    setInputBuffer("");
                }
                return;
            }

            if (event.key === "Backspace") {
                setInputBuffer((prev) => prev.slice(0, -1));
                return;
            }

            if (event.key.length === 1) {
                setInputBuffer((prev) => prev + event.key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [bootStage, inputBuffer]);

    // granted -> blank (once phase2 finishes printing)
    useEffect(() => {
        if (phase2Done && bootStage === "granted") {
            setBootStage("blank");
        }
    }, [phase2Done, bootStage]);

    // blank -> onBootComplete (after a random 1-3s pause)
    useEffect(() => {
        if (bootStage !== "blank") return;

        const randomDelay = 1000 + Math.random() * 2000;
        const timer = setTimeout(() => {
            onBootComplete();
        }, randomDelay);

        return () => clearTimeout(timer);
    }, [bootStage, onBootComplete]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [visibleBannerLines, displayLogs, displayPhase2, inputBuffer]);

    return (
        <div className="bootSequence-backdrop">
            <div className="terminal-window">
                <div className="terminal-title-bar">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="terminal-title-text">guest@rithishsivaraj: ~</span>
                </div>

                <div className="terminal-content" ref={contentRef}>
                    {bootStage !== "blank" && (
                        <>
              <pre style={{ color: "#FFFFFF", fontFamily: "monospace" }}>
                {visibleBannerLines.map((line) => line.text).join("\n")}
              </pre>

                            <div className="bootMessages">
                                {displayLogs.map((line, i) => (
                                    <div key={i}>{line.text}</div>
                                ))}
                            </div>

                            {bootStage === "prompt" && (
                                <div className="bootMessages">
                                    <div>ACCESS REQUEST: allow connection to rithishsivaraj.com? (y/n)</div>
                                    <div>
                                        &gt; {inputBuffer}
                                        <span className="cursor"></span>
                                    </div>
                                </div>
                            )}

                            {bootStage === "granted" && (
                                <div className="bootMessages">
                                    {displayPhase2.map((line, i) => (
                                        <div key={i}>{line.text}</div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BootSequence;