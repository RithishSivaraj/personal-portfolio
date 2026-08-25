import './NavBar.css';


function NavBar() {
    return (
        <nav className="navbar">
            <a href="#landing" className="navbar-brand">
                Rithish Sivaraj
            </a>

            <div className="navbar-links">
                <a href="#about" className="navbar-link">About</a>
                <a href="#experience" className="navbar-link">Experience</a>
                <a href="#projects" className="navbar-link">Projects</a>
                <a href="#resume" className="navbar-link">Resume</a>
                <a href="#contact" className="navbar-link">Contact</a>
            </div>
        </nav>
    )
}

export default NavBar;