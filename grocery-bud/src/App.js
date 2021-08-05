/*
global
*/

import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
    const list = localStorage.getItem("list");
    if (list) {
        return JSON.parse(list);
    }
    return [];
};

function App() {
    const [name, setName] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, "danger", "please enter value");
            //display alert
        } else if (isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editId) {
                        item.title = name;
                    }
                    return item;
                })
            );
            setName("");
            setEditId(null);
            setIsEditing(false);
            showAlert(true, "success", "value changed");
            //deal with editing
        } else {
            showAlert(true, "success", "new value entered");
            const newItem = { id: new Date().getTime().toString(), title: name };
            setList([...list, newItem]);
            setName("");
        }
    };

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };

    const inputHandler = (e) => {
        setName(e.target.value);
    };

    const removeItemHandler = (id) => {
        showAlert(true, "danger", "item removed");
        const newItems = list.filter((item) => {
            return item.id !== id;
        });
        setList(newItems);
    };

    const editItemHandler = (id) => {
        const editItem = list.find((item) => {
            return item.id === id;
        });
        setIsEditing(true);
        setEditId(id);
        setName(editItem.title);
    };

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]);

    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={submitHandler}>
                {alert.show && <Alert {...alert} hideAlert={showAlert} list={list} />}
                <h3>grocery bud</h3>
                <div className="form-control">
                    <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={inputHandler} />
                    <button className="submit-btn">{isEditing ? "edit" : "submit"}</button>
                </div>
            </form>
            {list.length > 0 && (
                <div className="grossery-container">
                    <List items={list} removeItemHandler={removeItemHandler} editItemHandler={editItemHandler} />
                    <button
                        className="clear-btn"
                        onClick={() => {
                            showAlert(true, "danger", "empty list");
                            setList([]);
                        }}
                    >
                        clear items
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
