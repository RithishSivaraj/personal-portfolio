import "./About.css"
import profile from '../../assets/IMG_9531.jpg'

function SkillsList() {
    const skills = ["Python", "TypeScript", "C++", "AWS", "Docker", "Kafka", "FastAPI", "React"];

    return (
        <ul className="skills-columns">
            {skills.map((skill) => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    );
}

function About() {
    return (
        <div className="about">
            <div className="about-wrapper">
                <div className="section-heading">
                    <h1>About</h1>
                    <span className="heading-line"></span>
                </div>
                <img src={profile} alt="profile" className="about-img" />
                <p className="about-intro">
                    I'm a Computer Science graduate from San Diego State University and I enjoy building things from the
                    ground up. My work and project experience spans distributed systems, backend infrastructure, and machine learning.
                    </p>
                <p className="about-followup">
                    Lately, I have been developing my AWS skills to better understand how I can use the knowledge to become a more efficient
                    builder and engineer. Here are some of my skills and tools I have worked with:
                </p>
                <SkillsList />
                <p className="about-followup">
                    I also enjoy learning more about AI and data science tools, and have worked on projects utilizing data to create
                    meaningful observations and solutions.
                </p>

            </div>
        </div>
    )
}

export default About;