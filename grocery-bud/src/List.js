import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItemHandler, editItemHandler }) => {
    return (
        <div className="grocery-list">
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article className="grocery-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-containter">
                            <button type="button" className="edit-btn">
                                <FaEdit onClick={() => editItemHandler(id)} />
                            </button>
                            <button type="button" className="delete-btn" onClick={removeItemHandler.bind(this, id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default List;
