import React from "react";

const Navbar = () => {
    return(
        <nav>
            <ul className="nav">
                <li className="nav-item d-flex flex-wrap flex-row justify-content-center">
                    <a className="nav-link active" aria-current="page" href="/">Accueil</a>
                </li>
                <li className="nav-item d-flex flex-wrap flex-row justify-content-center">
                    <a className="nav-link active" aria-current="page" href="/grids">Jouer</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;