import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
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
    const {tg} = useTelegram();
    const history = useNavigate();
    let location = useLocation();
    console.log(location.state?.totalPrice)

    tg.BackButton.onClick(() => {
        history('/hqd', {state: {totalPrice, cart}});
    })

    const { productId } = useParams();
    const product = productsData[productId];
    const [cart, setCart] = useState(location.state?.totalPrice || {});
    const [totalPrice, setTotalPrice] = useState(() => {
        const storedTotalPrice = location.state?.totalPrice;
        return storedTotalPrice ? storedTotalPrice : 0;
    });

    useEffect(() => {
        const storedCart = location.state?.cart;
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

        location = {totalPrice, cart}

        if(location.state?.totalPrice === 0 && !!!location.state?.totalPrice) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.setParams({text: `Купить ${location.state?.totalPrice}`,
                "color": "#31b545"});
            tg.MainButton.show();
        }

    }, [cart]);


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
                <button onClick={() => history('/hqd', {state: {totalPrice, cart}})}>back</button>
            </div>
        </div>
    );
};
export default ProductItem;