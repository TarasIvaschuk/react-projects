import React, { useState, useContext } from "react";
import sublinks from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [location, setLocation] = useState({});
    const [page, setPage] = useState({ page: "", links: [] });

    const openSideBar = () => {
        setIsSideBarOpen(true);
    };

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    };
    const openSubmenu = (text, coords) => {
        const page = sublinks.find((sublink) => {
            return sublink.page === text;
        });
        setPage(page);
        setLocation(coords);
        setIsSubmenuOpen(true);
    };

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    };

    return (
        <AppContext.Provider
            value={{
                isSubmenuOpen,
                isSideBarOpen,
                openSubmenu,
                closeSubmenu,
                openSideBar,
                closeSideBar,
                location,
                page
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
