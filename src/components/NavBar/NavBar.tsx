import './NavBar.css';

interface NavBarProps{
    brandName: string;
}


function NavBar({brandName}: NavBarProps) {
    return (
        <nav className="navbar-bg  bg-dark shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    {brandName}
                </a>
            </div>
        </nav>
    )
}

export default NavBar;