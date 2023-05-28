import React, {useState} from 'react';
import './HqdList.css';
import HqdItem from "../HqdItem/HqdItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import AnimatedPage from "../../AnimatedPage";

export const products = [
    {id: '1', title: 'DRAGBAR B5000', price: 900,
        img: `https://sun9-65.userapi.com/impg/_F1DA-7WWEH3m_OSfXRep0q3bmCB8UQZi9aIYA/G6u037ouVtg.jpg?size=1024x1024&quality=95&sign=1a94f94d968f4607e4283820d142b38f&type=album`,
        options: [
            'vanilla',
            'apple',
            'strawberry'
        ],
        count: 10
    },
    {id: '2', title: 'DRAGBAR B6000', price: 1000,
        options: []},
    {id: '3', title: 'LOST MARY BM5000', price: 900,
        img: `https://sun9-43.userapi.com/impg/05TMhD0ejlPKx34-wHjN8WbO-5Rzc4k2BaC_Aw/rESpbIN2IVk.jpg?size=2000x2000&quality=95&sign=19676aa438e85b7b68b6b2d63530db88&type=album`,
        options: [
            'cherry',
            'pineapple'
        ]
    },
    {id: '4', title: 'LOST MARY OS4000', price: 850,}
]

// const getTotalPrice = (items = []) => {
//     return items.reduce((acc, item) => {
//         return acc += item.price
//     }, 0)
// }

const HqdList = () => {
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

        if(newItems.length === 0) {
            tg.MainButton.hide();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`,
                "color": "#31b545"
            })
        } else {
            tg.MainButton.setParams({text: `Купить ${getTotalPrice(newItems)}`,
                "color": "#31b545"});
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
        <AnimatedPage>
            <div className={'list'}>
                {products.map(item => (
                    <HqdItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))}
            </div>
        </AnimatedPage>
    );
};

export default HqdList;