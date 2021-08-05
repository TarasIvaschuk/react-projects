import React, { useState } from "react";
import SingleColor from "./SingleColor";
import Values from "values.js";

function App() {
    const [color, setColor] = useState();
    const [error, setError] = useState(false);
    const [list, setList] = useState(new Values("#f15025").all(10));
    console.log("error:", error);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const colors = new Values(color).all(10);
            setError(false);
            setList(colors);
            console.log("colors:", colors);
            console.log("submit is working...");
        } catch (error) {
            setError(true);
            console.log("error: ", error);
        }
    };

    const handleInput = (e) => {
        setColor(e.target.value);
    };

    return (
        <>
            <section className="container">
                <h3>color generator</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={color} onChange={handleInput} id="" placeholder="#f15025" className={error ? "error" : null} />
                    <button className="btn" type="submit">
                        submit
                    </button>
                </form>
            </section>
            <section className="colors">
                {list.map((color, index) => {
                    console.log("color:", color);
                    return <SingleColor key={index} {...color} index={index}></SingleColor>;
                })}
            </section>
        </>
    );
}

export default App;
