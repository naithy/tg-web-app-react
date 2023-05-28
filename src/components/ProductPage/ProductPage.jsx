import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {products} from "../HqdList/HqdList";
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductPage = () => {
    const [total, setTotal] = useState(0);

    const [productCount, setProductCount] = useState(0);

    const handleAdd = () => {
        setProductCount(productCount + products.price);
        setTotal(total + products.price);
    };
    const handleRemove = () => {
        setProductCount(productCount - products.price);
        setTotal(total - products.price);
    };

    const params = useParams();
    const prodId = params.id;

    return (
        <ProductItem
            product = {products[params.id - 1]}
            onAdd={handleAdd}
            onRemove={handleRemove}
        />
    );
};

export default ProductPage;