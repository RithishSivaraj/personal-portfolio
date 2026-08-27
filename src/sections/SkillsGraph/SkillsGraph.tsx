import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import {
    forceCollide,
    forceX,
    forceY,
    type SimulationNodeDatum,
} from "d3-force";

import {
    nodes,
    links,
    type GraphNode,
    type GraphLink,
} from "../../data/skillsGraph";

import "./SkillsGraph.css";

interface SimNode extends GraphNode, SimulationNodeDatum {}

interface SimLink {
    source: string | SimNode;
    target: string | SimNode;
}

interface BoundaryForce {
    (): void;
    initialize(nodes: SimNode[]): void;
}

const GRAPH_PADDING = 24;

const graphData = {
    nodes: nodes as SimNode[],
    links: links as SimLink[],
};

const buildAdjacency = (
    graphLinks: GraphLink[]
): Record<string, string[]> => {
    const adjacency: Record<string, string[]> = {};

    graphLinks.forEach((link) => {
        const sourceId =
            typeof link.source === "object"
                ? (link.source as SimNode).id
                : link.source;

        const targetId =
            typeof link.target === "object"
                ? (link.target as SimNode).id
                : link.target;

        if (!adjacency[sourceId]) {
            adjacency[sourceId] = [];
        }

        if (!adjacency[targetId]) {
            adjacency[targetId] = [];
        }

        adjacency[sourceId].push(targetId);
        adjacency[targetId].push(sourceId);
    });

    return adjacency;
};

const adjacency = buildAdjacency(links);

const nodeRadius = (node: SimNode): number => {
    switch (node.type) {
        case "core":
            return 10;

        case "project":
            return 7;

        default:
            return 5;
    }
};

const findPathToRoot = (startId: string): Set<string> => {
    const path = new Set<string>([startId]);

    if (startId === "myskills") {
        return path;
    }

    const neighbors = adjacency[startId] ?? [];

    if (neighbors.includes("myskills")) {
        path.add("myskills");

        neighbors.forEach((neighborId) => {
            if (neighborId !== "myskills") {
                path.add(neighborId);
            }
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

/**
 * react-force-graph uses graph/world coordinates:
 *
 *              y = -height / 2
 *                     |
 * x = -width / 2 ---- 0 ---- x = width / 2
 *                     |
 *               y = height / 2
 *
 * This force clamps every node inside that visible area.
 */
const createBoundaryForce = (
    width: number,
    height: number,
    padding: number
): BoundaryForce => {
    let simulationNodes: SimNode[] = [];

    const leftBoundary = -width / 2 + padding;
    const rightBoundary = width / 2 - padding;
    const topBoundary = -height / 2 + padding;
    const bottomBoundary = height / 2 - padding;

    const force = (() => {
        simulationNodes.forEach((node) => {
            if (node.x == null || node.y == null) {
                return;
            }

            const radius = nodeRadius(node);

            const minimumX = leftBoundary + radius;
            const maximumX = rightBoundary - radius;
            const minimumY = topBoundary + radius;
            const maximumY = bottomBoundary - radius;

            if (node.x < minimumX) {
                node.x = minimumX;

                if ((node.vx ?? 0) < 0) {
                    node.vx = 0;
                }
            } else if (node.x > maximumX) {
                node.x = maximumX;

                if ((node.vx ?? 0) > 0) {
                    node.vx = 0;
                }
            }

            if (node.y < minimumY) {
                node.y = minimumY;

                if ((node.vy ?? 0) < 0) {
                    node.vy = 0;
                }
            } else if (node.y > maximumY) {
                node.y = maximumY;

                if ((node.vy ?? 0) > 0) {
                    node.vy = 0;
                }
            }
        });
    }) as BoundaryForce;

    force.initialize = (newNodes: SimNode[]) => {
        simulationNodes = newNodes;
    };

    return force;
};

function SkillsGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const [hoveredNode, setHoveredNode] =
        useState<SimNode | null>(null);

    const highlightedIds = useMemo(() => {
        return hoveredNode
            ? findPathToRoot(hoveredNode.id)
            : new Set<string>();
    }, [hoveredNode]);

    const isHighlighted = (nodeId: string): boolean => {
        return highlightedIds.has(nodeId);
    };

    /*
     * ResizeObserver follows the actual graph container size.
     * This works when the navbar changes height or the surrounding
     * page layout changes without a browser resize event.
     */
    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const updateDimensions = () => {
            const rectangle = container.getBoundingClientRect();

            setDimensions({
                width: Math.max(1, Math.floor(rectangle.width)),
                height: Math.max(1, Math.floor(rectangle.height)),
            });
        };

        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    /*
     * Configure the D3 simulation whenever the canvas size changes.
     */
    useEffect(() => {
        const graph = graphRef.current;

        if (
            !graph ||
            dimensions.width <= 1 ||
            dimensions.height <= 1
        ) {
            return;
        }

        /*
         * World coordinate 0 is the horizontal canvas center.
         * Negative X places the graph to the left of the heading.
         *
         * -22% from the center means the graph is initially
         * centered at approximately 28% of the canvas width.
         */
        const initialGraphX = -dimensions.width * 0.22;
        const initialGraphY = 0;

        const chargeForce = graph.d3Force("charge");

        if (chargeForce) {
            chargeForce.strength(-90);
        }

        graph.d3Force(
            "collide",
            forceCollide<SimNode>()
                .radius((node) => nodeRadius(node) + 4)
                .strength(1)
                .iterations(2)
        );

        /*
         * Disable the default centering force because it would pull
         * the graph back toward the middle of the canvas.
         */
        graph.d3Force("center", null);

        graph.d3Force(
            "x",
            forceX<SimNode>(initialGraphX).strength(0.025)
        );

        graph.d3Force(
            "y",
            forceY<SimNode>(initialGraphY).strength(0.025)
        );

        graph.d3Force(
            "boundary",
            createBoundaryForce(
                dimensions.width,
                dimensions.height,
                GRAPH_PADDING
            )
        );

        graph.d3ReheatSimulation();
    }, [dimensions]);

    const handleNodeDrag = (node: SimNode) => {
        const halfWidth = dimensions.width / 2;
        const halfHeight = dimensions.height / 2;
        const radius = nodeRadius(node);

        const minimumX = -halfWidth + GRAPH_PADDING + radius;
        const maximumX = halfWidth - GRAPH_PADDING - radius;
        const minimumY = -halfHeight + GRAPH_PADDING + radius;
        const maximumY = halfHeight - GRAPH_PADDING - radius;

        if (node.x != null) {
            node.x = Math.max(minimumX, Math.min(maximumX, node.x));
            node.fx = node.x;
        }

        if (node.y != null) {
            node.y = Math.max(minimumY, Math.min(maximumY, node.y));
            node.fy = node.y;
        }
    };

    return (
        <section
            className="content-wrapper skills-graph-container"
            ref={containerRef}
            aria-label="Introduction and skills graph"
        >
            <div className="skills-graph-text">
                <h1>Hi, I&apos;m Rithish!</h1>
                <p>Building software, one project at a time.</p>
            </div>

            {dimensions.width > 1 && dimensions.height > 1 && (
                <ForceGraph2D
                    ref={graphRef}
                    graphData={graphData}
                    width={dimensions.width}
                    height={dimensions.height}
                    nodeLabel="label"
                    nodeVal={nodeRadius}
                    nodeColor={(node: SimNode) =>
                        isHighlighted(node.id)
                            ? "#3ecf6f"
                            : "#000000"
                    }
                    linkColor={(link: SimLink) => {
                        const sourceId =
                            typeof link.source === "object"
                                ? link.source.id
                                : link.source;

                        const targetId =
                            typeof link.target === "object"
                                ? link.target.id
                                : link.target;

                        return highlightedIds.has(sourceId) &&
                        highlightedIds.has(targetId)
                            ? "#3ecf6f"
                            : "#000000";
                    }}
                    linkOpacity={0.4}
                    onNodeHover={(node) => {
                        setHoveredNode(
                            node as SimNode | null
                        );
                    }}
                    onNodeDrag={(node) => {
                        handleNodeDrag(node as SimNode);
                    }}
                    enableNodeDrag={true}
                    enableZoomInteraction={false}
                    enablePanInteraction={false}
                    minZoom={1}
                    maxZoom={1}
                />
            )}
        </section>
    );
}

export default SkillsGraph;