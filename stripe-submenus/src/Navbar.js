import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Navbar = () => {
    const { openSideBar, openSubmenu, closeSubmenu } = useGlobalContext();
    const displaySubMenu = (e) => {
        const page = e.target.textContent;
        console.log("-> page", page);
        const tempBtn = e.target.getBoundingClientRect();
        console.log("-> tempBtn", tempBtn);
        const center = (tempBtn.left + tempBtn.right) / 2;
        const bottom = tempBtn.bottom - 3; // we lift the submenu to the top for 3 pix
        openSubmenu(page, { center, bottom });
    };
    const handleSubmenu = (e) => {
        if (!e.target.classList.contains("link-btn")) {
            closeSubmenu();
        }
    };

    return (
        <nav className="nav" onMouseOver={handleSubmenu}>
            <div className="nav-center">
                <div className="nav-header">
                    <img src={logo} alt="stripe" className="nav-logo" />
                    <button className="btn toggle-btn" onClick={openSideBar}>
                        <FaBars />
                    </button>
                </div>
                <ul className="nav-links">
                    <li>
                        <button className="link-btn" onMouseOver={displaySubMenu}>
                            products
                        </button>
                    </li>
                    <li>
                        <button className="link-btn" onMouseOver={displaySubMenu}>
                            developers
                        </button>
                    </li>
                    <li>
                        <button className="link-btn" onMouseOver={displaySubMenu}>
                            company
                        </button>
                    </li>
                </ul>
                <button className="btn signin-btn">sign in</button>
            </div>
        </nav>
    );
};

export default Navbar;
