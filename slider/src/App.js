import React, { useState, useEffect } from "react";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
import Title from "./Title";
import Button from "./Button";
import Person from "./Person";

function App() {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let lastIndex = people.length - 1;
        if (index > lastIndex) {
            setIndex(0);
        }
        if (index < 0) {
            setIndex(lastIndex);
        }
        return () => {};
    }, [index, people]);

    useEffect(() => {
        let myInterval = setInterval(() => {
            setIndex(index + 1);
        }, 3000);
        return () => {
            clearInterval(myInterval);
        };
    }, [index]);

    return (
        <section className="section">
            <Title />
            <div className="section-center">
                {people.map((person, personIndex) => {
                    let position = "nextSlide";
                    if (personIndex === index) {
                        position = "activeSlide";
                    }
                    if (personIndex === index - 1 || (personIndex === 0 && personIndex === people.length - 1)) {
                        position = "lastSlide";
                    }
                    return <Person key={personIndex} {...person} position={position} />;
                })}
                <>
                    <Button onClickHandler={() => setIndex(index - 1)} index={index} isLeft={true} />
                    <Button onClickHandler={() => setIndex(index + 1)} index={index} isLeft={false} />
                </>
            </div>
        </section>
    );
}

export default App;
