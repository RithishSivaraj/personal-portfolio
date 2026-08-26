import { useRef, useState, useEffect } from 'react';
import { nodes, links, type GraphNode, type GraphLink } from "../../data/skillsGraph";
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import './SkillsGraph.css';

interface SimNode extends GraphNode {
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
}

interface SimLink {
    source: string | SimNode;
    target: string | SimNode;
}

const graphData = { nodes: nodes as SimNode[], links: links as SimLink[] };

const buildAdjacency = (links: GraphLink[]): Record<string, string[]> => {
    const adjacency: Record<string, string[]> = {};

    links.forEach((link) => {
        const sourceId = typeof link.source === "object" ? (link.source as SimNode).id : link.source;
        const targetId = typeof link.target === "object" ? (link.target as SimNode).id : link.target;

        if (!adjacency[sourceId]) adjacency[sourceId] = [];
        if (!adjacency[targetId]) adjacency[targetId] = [];
        adjacency[sourceId].push(targetId);
        adjacency[targetId].push(sourceId);
    });

    return adjacency;
};

const adjacency = buildAdjacency(links);

const nodeRadius = (node: SimNode): number => {
    if (node.type === "core") return 10;
    if (node.type === "project") return 7;
    return 5; // tool
};

const findPathToRoot = (startId: string): Set<string> => {
    const path = new Set<string>([startId]);

    if (startId === "myskills") return path;

    const neighbors = adjacency[startId] || [];

    if (neighbors.includes("myskills")) {
        path.add("myskills");
        neighbors.forEach((neighborId) => {
            if (neighborId !== "myskills") path.add(neighborId);
        });
        return path;
    }

    for (const neighborId of neighbors) {
        if (adjacency[neighborId]?.includes("myskills")) {
            path.add(neighborId);
            path.add("myskills");
            break;
        }
    }

    return path;
};

function SkillsGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);

    const highlightedIds = hoveredNode ? findPathToRoot(hoveredNode.id) : new Set<string>();
    const isHighlighted = (nodeId: string) => highlightedIds.has(nodeId);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (!graphRef.current || dimensions.width === 0) return;

        graphRef.current.d3Force('charge').strength(-120);
        graphRef.current.d3Force('collide', forceCollide(nodeRadius));
        graphRef.current.d3Force('center', null);
        graphRef.current.d3ReheatSimulation();
    }, [dimensions]);

    return (
        <div className="content-wrapper skills-graph-container" ref={containerRef}>
            <div className="skills-graph-text">
                <h1>Hi, I'm Rithish!</h1>
                <p>Building software, one project at a time.</p>
            </div>

            <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                nodeLabel="label"
                nodeVal={nodeRadius}
                nodeColor={(node: SimNode) => (isHighlighted(node.id) ? "#3ecf6f" : "#000000")}
                linkColor={(link: SimLink) => {
                    const sourceId = typeof link.source === "object" ? link.source.id : link.source;
                    const targetId = typeof link.target === "object" ? link.target.id : link.target;
                    return highlightedIds.has(sourceId) && highlightedIds.has(targetId)
                        ? "#3ecf6f"
                        : "#000000";
                }}
                linkOpacity={0.4}
                onNodeHover={(node) => setHoveredNode(node as SimNode | null)}
                enableZoomInteraction={false}
                enablePanInteraction={false}
            />
        </div>
    );
}

export default SkillsGraph;