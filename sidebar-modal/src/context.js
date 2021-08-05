import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    console.log("-> children", children);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSideBar = () => {
        setIsSideBarOpen(true);
    };

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AppContext.Provider
            value={{
                isModalOpen,
                isSideBarOpen,
                openModal,
                closeModal,
                openSideBar,
                closeSideBar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { useContext, AppProvider };
