const reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    }
    if (action.type === "REMOVE") {
        return {
            ...state,
            cart: state.cart.filter((item) => {
                return item.id !== action.payload;
            }),
        };
    }
    if (action.type === "INCREASE") {
        const tempCartItems = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 };
            }
            return cartItem;
        });
        return { ...state, cart: tempCartItems };
    }

    if (action.type === "DECREASE") {
        const tempCartItems = state.cart
            .map((cartItem, array) => {
                if (cartItem.id === action.payload) {
                    return { ...cartItem, amount: cartItem.amount - 1 };
                }
                return cartItem;
            })
            .filter((item) => {
                return item.amount >= 0;
            });
        return { ...state, cart: tempCartItems };
    }

    if (action.type === "GET_TOTALS") {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                cartTotal.amount = cartTotal.amount + amount;
                cartTotal.total = cartTotal.total + price * amount;
                return cartTotal;
            },
            { total: 0, amount: 0 }
        );
        total = parseFloat(total.toFixed(2));
        return { ...state, total, amount };
    }

    if (action.type === "LOADING") {
        return { ...state, isLoading: true };
    }

    if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, isLoading: false };
    }

    if (action.type === "TOGGLE_AMOUNT") {
        const tempCartItems = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === "inc") {
                        return { ...cartItem, amount: cartItem.amount + 1 };
                    }
                    if (action.payload.type === "dec") {
                        return { ...cartItem, amount: cartItem.amount - 1 };
                    }
                }
                return cartItem;
            })
            .filter((cartItem) => {
                return cartItem.amount >= 0;
            });

        return { ...state, cart: tempCartItems };
    }

    throw new Error("No matching action type");
};

export default reducer;
