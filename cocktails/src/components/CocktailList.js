import React from "react";
import Loading from "./Loading";
import Cocktail from "./Cocktail";
import { useGlobalContext } from "../context";

const CocktailList = () => {
    const { loading, cocktails } = useGlobalContext();
    console.log("  -> CocktailList -> cocktails", cocktails);
    if (loading) {
        return <Loading />;
    }
    if (cocktails.length < 1) {
        return (
            <h2 className="section-title">
                no cocktails match your search criteria
            </h2>
        );
    }

    return (
        <section className="section">
            <h2 className="section-title">cocktails</h2>
            <div className="cocktails-center">
                {cocktails.map((cocktail) => {
                    return <Cocktail key={cocktail.id} {...cocktail} />;
                })}
            </div>
        </section>
    );
};

export default CocktailList;
