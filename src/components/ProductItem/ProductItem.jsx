import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './ProductItem.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import AnimatedPage from "../../AnimatedPage";

const ProductItem = () => {


    const navigate = useNavigate();
    const {tg} = useTelegram();

    const productsData = useLocation().state.product

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate(-1);
        window.history.go(-1);
    });

    const { productId } = useParams();


    const product = productsData[productId] || {};

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

    const [animationNames, setAnimationNames] = useState({})
    const [classNames, setClassNames] = useState({})
    const [style, setStyle] = useState(false);
    const [styleName, setStyleName] = useState(true);

    const handleAdd = (flavor) => {
        setClassNames((prevNames) => ({
            ...prevNames,
            [`${flavor}`]: ''
        }));
    }
    const handleIncrement = (flavor) => {
        if(!style) {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${product._id}-${flavor}`]: 'badge-incr',
            }));
            setStyle(true)
        } else {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${product._id}-${flavor}`]: 'badge-incr2',
            }));
            setStyle(false)
        }
    };
    const handleDecrement = (flavor) => {
        if(!style) {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${product._id}-${flavor}`]: 'badge-decr',
            }));
            setStyle(true)
        } else {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${product._id}-${flavor}`]: 'badge-decr2',
            }));
            setStyle(false)
        }
    };


    const handleAddToCart = (flavor, quantity) => {
        handleAdd(flavor)
        handleIncrement(flavor)
        tg.HapticFeedback.impactOccurred('light')
        const newCart = { ...cart };
        if (newCart[product._id]?.flavors[flavor] >= quantity) {
            return 0
        }
        if (newCart[product._id] && newCart[product._id].flavors[flavor]) {
            newCart[product._id].flavors[flavor]++;
        } else {
            if (!newCart[product._id]) {
                newCart[product._id] = {};
                newCart[product._id].title = product.title;
                newCart[product._id].price = product.price;
                newCart[product._id].flavors = {};
            }
            newCart[product._id].flavors[flavor] = 1;
        }
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        const total = calculateTotalPrice(newCart);
        setTotalPrice(total);
        sessionStorage.setItem('totalPrice', JSON.stringify(total));
        dispatchEvent(new Event("storage"))
    }

    const handleRemoveFromCart = (flavor) => {
        handleDecrement(flavor)
        tg.HapticFeedback.impactOccurred('light')
        const newCart = { ...cart };
        if (newCart[product._id] && newCart[product._id].flavors[flavor]) {
            newCart[product._id].flavors[flavor]--;
            if (newCart[product._id].flavors[flavor] === 0) {
                delete newCart[product._id].flavors[flavor];
                if (Object.keys(newCart[product._id].flavors).length === 0) {
                    delete newCart[product._id];
                }
            }
            setCart(newCart);
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            const total = calculateTotalPrice(newCart);
            setTotalPrice(total);
            sessionStorage.setItem('totalPrice', JSON.stringify(total));
            dispatchEvent(new Event("storage"))
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
                        if((Object.values(product.flavors).reduce((a, b) => a + b, 0)) >= 3) {
                            total += count * (price - 100);
                        } else {
                            total += count * price;
                        }
                    }
                }
            }
        }
        return total;
    };

    if(!sessionStorage.getItem('totalPrice') || parseFloat(sessionStorage.getItem('totalPrice')) === 0) {
        tg.MainButton.hide()
    } else {
        tg.MainButton.setParams({
            text: `Посмотреть заказ`,
            "color": "#31b545"
        });
        tg.MainButton.show();
        tg.MainButton.onClick(() => navigate('/checkout'));
    }

    const [strength, setStrenght] = useState();
    const LightButton = () => {
        let color = document.getElementById('strengthbtnlight');
        let color2 = document.getElementById('strengthbtnhard');
        color2.style.background = 'var(--tg-theme-button-color)'
        color.style.background = '#31b545';
        setStrenght('LIGHT')
    }

    const HardButton = () => {
        let color = document.getElementById('strengthbtnhard');
        let color2 = document.getElementById('strengthbtnlight');
        color2.style.background = 'var(--tg-theme-button-color)'
        color.style.background = '#31b545';
        setStrenght('HARD')
    }

    return (
        <AnimatedPage>
            <div className={'productcontainer'}>
                <div className={'title'}>
                    <img className={'hqdimg2'} src={product.img} alt={'parilka'}/>
                    <div className={'titletext'}>
                        <h3 className={'underline'}>{product.title}</h3>
                        <div className={'description'}>{product.description}</div>
                        <div className={'price'}>{product.price}p.</div>
                    </div>
                </div>
                {product.category === 'disposable'? (<div className={'strength'}>
                    <button className={'strengthbtnlight'}  id='strengthbtnlight' onClick={LightButton}>LIGHT</button>
                    <button className={'strengthbtnhard'} id='strengthbtnhard' onClick={HardButton}>HARD</button>
                </div>) : ''}
                <div className="choicecontainer">
                    {Object.keys(product.flavors)
                        .filter((flavor) => flavor.endsWith(strength))
                        .map((flavor) => {
                            const quantity = product.flavors[flavor];
                            return (
                                <div key={flavor}>
                                    {parseFloat(quantity) !== 0 && (
                                        <div className="option">
                                            <div className="btns">
                                                <Button
                                                    className={`addBtn ${
                                                        cart[product._id] &&
                                                        cart[product._id].flavors[`${flavor}`]
                                                            ? classNames[`${flavor}`]
                                                            : "nonselected"
                                                    }`}
                                                    onClick={() => handleAddToCart(flavor, quantity)}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    className={`rmvBtn ${
                                                        cart[product._id] &&
                                                        cart[product._id].flavors[`${flavor}`]
                                                            ? classNames[`${flavor}`]
                                                            : "hidebtn"
                                                    }`}
                                                    onClick={() => handleRemoveFromCart(flavor)}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                            <div className={"producttext"}>
                                                <p>{flavor}</p>
                                                <div
                                                    id={`badge-${product._id}-${flavor}`}
                                                    className="badge hide"
                                                    style={{
                                                        animationDuration:
                                                            cart[product._id] &&
                                                            cart[product._id].flavors[`${flavor}`]
                                                                ? "0.1s"
                                                                : "0",
                                                        animationName:
                                                            cart[product._id] &&
                                                            cart[product._id].flavors[`${flavor}`]
                                                                ? animationNames[`${product._id}-${flavor}`]
                                                                : "badge-hide",
                                                    }}
                                                >
                                                    {cart[product._id] && cart[product._id].flavors[`${flavor}`]
                                                        ? cart[product._id].flavors[`${flavor}`]
                                                        : 0}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ProductItem;