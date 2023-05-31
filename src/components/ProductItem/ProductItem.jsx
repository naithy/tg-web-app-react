import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './ProductItem.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";





const ProductItem = () => {
    const {tg} = useTelegram();

    const productsData = [
        { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'] },
        { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
        { title: 'voopoo', price: 950, flavors: ['mango'] },
        { title: 'vaporesso', price: 900 },
    ];

    const { productId } = useParams();
    const product = productsData[productId];
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || {});
    const [totalPrice, setTotalPrice] = useState(() => {
        const storedTotalPrice = parseFloat(sessionStorage.getItem('totalPrice'));
        return storedTotalPrice ? storedTotalPrice : 0;
    });

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
            const total = calculateTotalPrice(storedCart);
            setTotalPrice(total);
            sessionStorage.setItem('totalPrice', JSON.stringify(total));
        }
    }, []);

    const handleAddToCart = (flavor) => {
        const newCart = { ...cart };
        if (newCart[productId] && newCart[productId].flavors[flavor]) {
            newCart[productId].flavors[flavor]++;
        } else {
            if (!newCart[productId]) {
                newCart[productId] = {};
                newCart[productId].title = product.title;
                newCart[productId].price = product.price;
                newCart[productId].flavors = {};
            }
            newCart[productId].flavors[flavor] = 1;
        }
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        const total = calculateTotalPrice(newCart);
        setTotalPrice(total);
        sessionStorage.setItem('totalPrice', JSON.stringify(total));
    }

    const handleRemoveFromCart = (flavor) => {
        const newCart = { ...cart };
        if (newCart[productId] && newCart[productId].flavors[flavor]) {
            newCart[productId].flavors[flavor]--;
            if (newCart[productId].flavors[flavor] === 0) {
                delete newCart[productId].flavors[flavor];
                if (Object.keys(newCart[productId].flavors).length === 0) {
                    delete newCart[productId];
                }
            }
            setCart(newCart);
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            const total = calculateTotalPrice(newCart);
            setTotalPrice(total);
            sessionStorage.setItem('totalPrice', JSON.stringify(total));
        }
    }

    const calculateTotalPrice = (cart) => {
        let total = 0;
        for (let productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const product = cart[productId];
                const price = product.price;
                for (let flavor in product.flavors) {
                    if (product.flavors.hasOwnProperty(flavor)) {
                        const count = product.flavors[flavor];
                        total += count * price;
                    }
                }
            }
        }
        return total;
    };

    if(!sessionStorage.getItem('totalPrice')) {
        tg.MainButton.hide()
    } else {
        tg.MainButton.setParams({text: `Купить ${parseFloat(sessionStorage.getItem('totalPrice'))}`,
            "color": "#31b545"});
        tg.MainButton.show();
    }


    return (
        <div className={'productcontainer'}>
            <div className={'title'}>
                <h3 className={'underline'}>{product.title}</h3>
            </div>
            <div className={'choicecontainer'}>
                {product.flavors.map((flavor) => (
                    <div className={'option'}>
                        <div className={'btns'}>
                            <Button className={'addBtn'} onClick={() => handleAddToCart(flavor)}>+</Button>
                            <Button className={'rmvBtn'} onClick={() => handleRemoveFromCart(flavor)}>-</Button>
                        </div>
                        <div className={'producttext'}>
                            <p>{flavor} {product.price} - {cart[productId] && cart[productId].flavors[`${flavor}`] ? cart[productId].flavors[`${flavor}`] : 0}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductItem;