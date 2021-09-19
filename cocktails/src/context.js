import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("a");
    const [cocktails, setCocktails] = useState([]);

    const fetchCocktails = useCallback(
        async (params) => {
            setLoading(true);
            try {
                const response = await fetch(`${url}${searchTerm}`);
                const { drinks } = await response.json();
                console.log("  -> fetchCocktails -> drinks", drinks);
                if (drinks) {
                    const newCocktails = drinks.map((drink) => {
                        const {
                            idDrink,
                            strDrink,
                            strAlcoholic,
                            strDrinkThumb,
                            strGlass,
                        } = drink;
                        return {
                            id: idDrink,
                            info: strAlcoholic,
                            image: strDrinkThumb,
                            name: strDrink,
                            glass: strGlass,
                        };
                    });
                    setCocktails(newCocktails);
                } else {
                    setCocktails([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                console.log("Finally is working");
                setLoading(false);
            }
        },
        [searchTerm]
    );

    useEffect(() => {
        fetchCocktails();
    }, [searchTerm, fetchCocktails]);

    return (
        <AppContext.Provider
            value={{
                loading,
                cocktails,
                setSearchTerm,
            }}>
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
