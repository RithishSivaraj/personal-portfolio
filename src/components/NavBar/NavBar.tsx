import './NavBar.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';



function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="navbar">
            <div className="content-wrapper navbar-inner">
            <a href="#landing" className="navbar-brand">
                Rithish Sivaraj
            </a>

                <div className={isMenuOpen ? "navbar-links open" : "navbar-links"}>
                    <a href="#Home" className="navbar-link">Home</a>
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
                <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                </button>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;