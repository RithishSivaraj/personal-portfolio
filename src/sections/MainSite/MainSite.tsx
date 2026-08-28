import NavBar from "../../components/NavBar/NavBar.tsx";
import SkillsGraph from "../SkillsGraph/SkillsGraph.tsx";
import About from "../About/About.tsx";
import Experience from "../Experience/Experience.tsx";
import Projects from "../Projects/Projects.tsx";

function MainSite() {
    return (
        <div>
            <NavBar />
            <SkillsGraph />
            <About />
            <Experience />
            <Projects />
        </div>

    );
}

export default MainSite;