// productcontex.js

import axios from "axios";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import ProductReducer from "../reducer/productReducer";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState)
    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            // console.log(
            //     "🚀 ~ file: productcontex.js ~ line 18 ~ getProducts ~ products",
            //     res
            // );

            // const products = await res.data;
            // console.log(
            //     "🚀 ~ file: productcontex.js ~ line 18 ~ getProducts ~ products",
            //     products
            // );

            const products = await res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API_ERROR" });

        }

    }

    // my 2nd api call for single product

    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });

        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR" });
        }
    }

    useEffect(() => {
        getProducts(API);
    }, [])
    return <AppContext.Provider value={{ ...state, getSingleProduct }}>  {/* add all data */}
        {children}
    </AppContext.Provider>
};

// custom hooks
const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };