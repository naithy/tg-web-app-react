import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './ProductItem.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import AnimatedPage from "../../AnimatedPage";

const ProductItem = () => {
    const navigate = useNavigate();
    const {tg} = useTelegram();





    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        navigate(-1);
        window.history.go(-1);
    });

    const { productId } = useParams();

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        fetch('https://sakurashopsmr.ru/product?category=disposable')
            .then(response => response.json())
            .then(data => {
                setProductsData(data);
            })
            .catch(error => console.error('Error fetching products:', error));
        console.log(productsData)
    }, []);


    const product = productsData[productId];

    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || {});
    const [totalPrice, setTotalPrice] = useState(() => {
        const storedTotalPrice = parseFloat(sessionStorage.getItem('totalPrice'));
        return storedTotalPrice ? storedTotalPrice : 0;
    });

    // useEffect(() => {
    //     const storedCart = JSON.parse(sessionStorage.getItem('cart'));
    //     if (storedCart) {
    //         setCart(storedCart);
    //         const total = calculateTotalPrice(storedCart);
    //         setTotalPrice(total);
    //         sessionStorage.setItem('totalPrice', JSON.stringify(total));
    //     }
    // }, []);

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
                [`${productId}-${flavor}`]: 'badge-incr',
            }));
            setStyle(true)
        } else {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${productId}-${flavor}`]: 'badge-incr2',
            }));
            setStyle(false)
        }
    };
    const handleDecrement = (flavor) => {
        if(!style) {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${productId}-${flavor}`]: 'badge-decr',
            }));
            setStyle(true)
        } else {
            setAnimationNames((prevNames) => ({
                ...prevNames,
                [`${productId}-${flavor}`]: 'badge-decr2',
            }));
            setStyle(false)
        }
    };


    const handleAddToCart = (flavor) => {
        handleAdd(flavor)
        handleIncrement(flavor)
        tg.HapticFeedback.impactOccurred('light')
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
        dispatchEvent(new Event("storage"))
    }

    const handleRemoveFromCart = (flavor) => {
        handleDecrement(flavor)
        tg.HapticFeedback.impactOccurred('light')
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
                        if(count >= 3) {
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
        tg.MainButton.setParams({text: `Посмотреть заказ`,
            "color": "#31b545"});
        tg.MainButton.show();
        tg.MainButton.onClick(() => navigate('/checkout'));
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
                <div className="choicecontainer">
                    {Object.entries(product.flavors).map(([flavor, quantity]) => (
                        <div className="option" key={flavor}>
                            <div className={'btns'}>
                                <Button className={`addBtn ${(cart[productId] && cart[productId].flavors[`${flavor}`]) ? classNames[`${flavor}`] : 'nonselected' }`} onClick={() => handleAddToCart(flavor)}>+</Button>
                                <Button className={`rmvBtn ${(cart[productId] && cart[productId].flavors[`${flavor}`]) ? classNames[`${flavor}`] : 'hidebtn'}`} onClick={() => handleRemoveFromCart(flavor)}>-</Button>
                            </div>
                            <div className={"producttext"}>
                                <p>{flavor}</p>
                                <div
                                    id={`badge-${productId}-${flavor}`} // Добавляем уникальный идентификатор
                                    className="badge hide"
                                    style={{
                                        animationDuration: (cart[productId] && cart[productId].flavors[`${flavor}`]) ?
                                            '0.1s' : '0',
                                        animationName: (cart[productId] && cart[productId].flavors[`${flavor}`]) ?
                                            animationNames[`${productId}-${flavor}`] : 'badge-hide',
                                    }}
                                >
                                    {cart[productId] && cart[productId].flavors[`${flavor}`] ? cart[productId].flavors[`${flavor}`] : 0}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ProductItem;