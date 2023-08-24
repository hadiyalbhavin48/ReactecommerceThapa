//ProductList.js
import React from 'react'
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
    const { filter_products, grid_view } = useFilterContext();
    // return (
    //     <div>ProductList</div>
    // )

    if (grid_view === true) {
        return <GridView products={filter_products} />;
    }

    if (grid_view === false) {
        return <ListView products={filter_products} />;
    }
}

export default ProductList