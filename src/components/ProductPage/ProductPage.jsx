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

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    const onAdd = (product) => {
        tg.MainButton.setParams({
            text: `Купить`
        })

        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(!!alreadyAdded) {
            newItems = [...addedItems, product];
        }

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    const params = useParams();
    const prodId = params.id;

    return (
        <ProductItem
            product = {products[params.id - 1]}
            onAdd={onAdd}
        />
    );
};

export default ProductPage;