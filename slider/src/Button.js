import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Button = ({ onClickHandler, index, isLeft }) => {
    return (
        <button className={isLeft ? "prev" : "next"} onClick={onClickHandler.bind(this, [index])}>
            {isLeft ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
    );
};

export default Button;
