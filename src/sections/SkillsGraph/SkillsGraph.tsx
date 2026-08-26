import { nodes, links } from "../../data/skillsGraph";
import ForceGraph2D from 'react-force-graph-2d';

const graphData = { nodes: nodes, links: links };

function SkillsGraph() {
    return (
        <div className="content-wrapper skills-graph-container">
            <ForceGraph2D
                graphData={graphData}
                width={800}
                height={600}
            />
        </div>
    );
}

export default SkillsGraph;