import { useRef, useState, useEffect } from 'react';
import { nodes, links, type GraphLink } from "../../data/skillsGraph";
import ForceGraph2D from 'react-force-graph-2d';

const graphData = { nodes: nodes, links: links };

const buildAdjacency = (links: GraphLink[]): Record<string, string[]> => {
    const adjacency: Record<string, string[]> = {};

    links.forEach((link: any) => {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source;
        const targetId = typeof link.target === "object" ? link.target.id : link.target;

        if (!adjacency[sourceId]) adjacency[sourceId] = [];
        if (!adjacency[targetId]) adjacency[targetId] = [];
        adjacency[sourceId].push(targetId);
        adjacency[targetId].push(sourceId);
    });

    return adjacency;
};

const adjacency = buildAdjacency(links);

const findPathToRoot = (startId: string): Set<string> => {
    const path = new Set<string>([startId]);

    if (startId === "myskills") return path;

    const neighbors = adjacency[startId] || [];

    // if this node connects directly to myskills, it's a project —
    // include myskills AND every tool this project uses
    if (neighbors.includes("myskills")) {
        path.add("myskills");
        neighbors.forEach((neighborId) => {
            if (neighborId !== "myskills") path.add(neighborId);
        });
        return path;
    }

    // otherwise, it's a tool — find its parent project, then that
    // project's path to root (existing behavior, unchanged)
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
    const [hoveredNode, setHoveredNode] = useState<any>(null);

    const highlightedIds = hoveredNode ? findPathToRoot(hoveredNode.id) : new Set<string>();
    console.log("hovered:", hoveredNode?.id, "highlighted:", Array.from(highlightedIds));
    console.log("adjacency for hovered:", adjacency[hoveredNode?.id]);

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
        if (graphRef.current) {
            graphRef.current.d3Force('charge').strength(-20);
        }
    }, []);

    return (
        <div className="content-wrapper skills-graph-container" ref={containerRef}>
            <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                nodeLabel="label"
                nodeColor={(node: any) => (isHighlighted(node.id) ? "#3ecf6f" : "#000000")}
                linkColor={(link: any) =>
                    highlightedIds.has(link.source.id) && highlightedIds.has(link.target.id)
                        ? "#3ecf6f"
                        : "#000000"
                }
                linkOpacity={0.4}
                onNodeHover={(node) => setHoveredNode(node)}
            />
        </div>
    );
}

export default SkillsGraph;