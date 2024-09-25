import React from "react";

function NavBarItem({ render, href, onClick, label }) {
    if(render) {
        return (
            <li className="nav-item">
                <a onClick={onClick} className="nav-link" href={href}>{label}</a>
            </li>
        );
    } else {
        return null; // Retorna null para não renderizar nada se render for falso
    }
}

export default NavBarItem;
