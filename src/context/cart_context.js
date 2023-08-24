// cart_context.js



import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

// get Local starege data
// get Local starege data
const getLocalCartData = () => {
    let localCartData = localStorage.getItem("thapaCart");  // pass key thapaCart
    if (localCartData === []) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
    };

    // increment and decrement the product
    //decrement
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    // increment
    const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };

    // to remove the individual item from cart
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    // to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };


    // to add the data in localStorage
    // get vs set   // Get-> melavu   , set -> add karvu

    // data set local storege

    // useEffect(() => {
    //     dispatch({ type: "CART_TOTAL_ITEM" });   // update Cart
    //     dispatch({ type: "CART_TOTAL_PRICE" });  // price Total
    //     localStorage.setItem("thapaCart", JSON.stringify(state.cart));
    // }, [state.cart]);

    // --- Sort  useEffect  ------


    useEffect(() => {
        // dispatch({ type: "CART_TOTAL_ITEM" });   // update Cart
        // dispatch({ type: "CART_TOTAL_PRICE" });  // price Total

        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
        localStorage.setItem("thapaCart", JSON.stringify(state.cart));
    }, [state.cart]);



    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeItem,
                clearCart,
                setDecrease,
                setIncrement,
            }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };


