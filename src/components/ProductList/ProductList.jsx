import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'DRAGBAR 5000/6000', price: 900, description: '5000/6000 затяжек', img: `https://sun9-65.userapi.com/impg/_F1DA-7WWEH3m_OSfXRep0q3bmCB8UQZi9aIYA/G6u037ouVtg.jpg?size=1024x1024&quality=95&sign=1a94f94d968f4607e4283820d142b38f&type=album`},
    {id: '3', title: 'LOST MARY 5000', price: 900, description: '5000 затяжек'},
    {id: '4', title: 'GANG X BOX 8000', price: 1200, description: '8000 затяжек', img: `https://sun9-43.userapi.com/impg/05TMhD0ejlPKx34-wHjN8WbO-5Rzc4k2BaC_Aw/rESpbIN2IVk.jpg?size=2000x2000&quality=95&sign=19676aa438e85b7b68b6b2d63530db88&type=album`},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
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
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length !== 0) {
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`,
                "color": "#31b545"
            })
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;