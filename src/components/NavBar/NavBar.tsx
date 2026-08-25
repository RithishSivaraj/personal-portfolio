import './NavBar.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


function NavBar() {
    return (
        <nav className="navbar">
            <div className="content-wrapper navbar-inner">
            <a href="#landing" className="navbar-brand">
                Rithish Sivaraj
            </a>

            <div className="navbar-links">
                <a href="#about" className="navbar-link">About</a>
                <a href="#experience" className="navbar-link">Experience</a>
                <a href="#projects" className="navbar-link">Projects</a>
                <a href="#resume" className="navbar-link">Resume</a>
            </div>
            <div className="navbar-icons">
                <a href="mailto:rithishsivaraj@outlook.com" className="navbar-icon icon-mailto">
                    <MdEmail />
                </a>
                <a href="https://www.linkedin.com/in/rithishsivaraj/" target="_blank" rel="noopener noreferrer" className="navbar-icon icon-linkedin">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/RithishSivaraj" target="_blank" rel="noopener noreferrer" className="navbar-icon icon-github">
                    <FaGithub />
                </a>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;