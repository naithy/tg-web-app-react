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
    const {tg, queryId} = useTelegram();

    const [total, setTotal] = useState(0);
    const [productCount, setProductCount] = useState(0);

    const handleAdd = () => {
        setProductCount(productCount + products[params.id - 1].price);
        setTotal(total + products[params.id - 1].price);
    };
    const handleRemove = () => {
        setProductCount(productCount - products[params.id - 1].price);
        setTotal(total - products[params.id - 1].price);
    };

    if(productCount === 0) {
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: `Купить ${total}`,
            "color": "#31b545"
        })
    } else {
        tg.MainButton.setParams({text: `Купить ${total}`,
            "color": "#31b545"});
        tg.MainButton.show();
    }

    const params = useParams();
    const prodId = params.id;

    return (
        <ProductItem
            product={products[params.id - 1]}
            onAdd={handleAdd}
            onRemove={handleRemove}
            productCount={productCount}
        />
    );
};

export default ProductPage;