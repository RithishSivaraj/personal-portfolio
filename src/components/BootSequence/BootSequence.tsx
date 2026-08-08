

interface BootSequenceProps {
    onBootComplete: () => void;
}

function BootSequence({ onBootComplete }: BootSequenceProps) {
    return (
        <div
            className="bootSequence"
            style={{backgroundColor: "black", width: "100vw", height: "100dvh" }}
            >

        </div>
    );
}

export default BootSequence;