import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import './ProductItem.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";


const productsData = [
    { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'] },
    { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
    { title: 'voopoo', price: 950, flavors: ['mango'] },
    { title: 'vaporesso', price: 900 },
];

const ProductItem = () => {

    const history = useNavigate();

    const { productId } = useParams();
    const product = productsData[productId];
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});
    const [totalPrice, setTotalPrice] = useState(() => {
        const storedTotalPrice = localStorage.getItem('totalPrice');
        return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
            setTotalPrice(Object.keys(storedCart).reduce((total, productId) => (
                total + Object.values(storedCart[productId]).reduce((sum, { price, count }) => sum + price * count, 0)
            ), 0));
        }
    }, []);

    const handleAddToCart = (flavor) => {
        const newCart = { ...cart };
        if (newCart[productId] && newCart[productId][flavor]) {
            newCart[productId][flavor].count++;
        } else {
            if (!newCart[productId]) {
                newCart[productId] = {};
            }
            newCart[productId][flavor] = { title: product.title, price: product.price, count: 1 };
        }
        setCart(newCart);
    };

    const handleRemoveFromCart = (flavor) => {
        const newCart = { ...cart };
        if (newCart[productId] && newCart[productId][flavor]) {
            newCart[productId][flavor].count--;
            if (newCart[productId][flavor].count === 0) {
                delete newCart[productId][flavor];
                if (Object.keys(newCart[productId]).length === 0) {
                    delete newCart[productId];
                }
            }
            setCart(newCart);
        }
    };

    useEffect(() => {
        const totalPrice = Object.keys(cart).reduce((sum, pId) => {
            return sum + Object.keys(cart[pId]).reduce((pSum, flavor) => {
                return pSum + cart[pId][flavor].price * cart[pId][flavor].count;
            }, 0);
        }, 0);
        setTotalPrice(totalPrice);
        localStorage.setItem('totalPrice', totalPrice)
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const {tg} = useTelegram();

    if(totalPrice === 0) {
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: `Купить`,
            "color": "#31b545"
        })
    } else {
        tg.MainButton.setParams({text: `Купить ${totalPrice}`,
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
                            <p>{flavor} {product.price} - {cart[productId] && cart[productId][flavor] ? cart[productId][flavor].count : 0}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => {history(-1)}}>Go back</button>
        </div>
    );
};
export default ProductItem;