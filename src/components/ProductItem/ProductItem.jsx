import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './ProductItem.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import AnimatedPage from "../../AnimatedPage";

const ProductItem = () => {
    const history = useNavigate();
    const {tg} = useTelegram();

    const productsData = [
        { title: 'GANG X BOX 8000', price: 1100, flavors: ['' +
            'Ананас Малина Вишня', 'Бабл-гам', 'Жвачка с лесными ягодами',
                'Ледяная мятная жвачка', 'Малина Яблоко Мята', 'Ледяная Черника Смородина',
                'Энергетик с черешней', 'Холодные тропические фрукты'
            ],
            description: '8000 затяжек',
            img: 'https://sun9-66.userapi.com/impg/daUL-0rsVWF4iFxoIBNOpsYf93LJ_8yOyCnTkA/Qr3P8UJK2_I.jpg?size=1280x1280&quality=96&sign=10b465a1219b01ac2e85cd7a3ee6ebc1&type=album'
        },
        { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
        { title: 'voopoo', price: 950, flavors: ['mango'] },
        { title: 'vaporesso', price: 900 },
    ];

    tg.BackButton.onClick(() => {
        history(-1);
        window.history.go(-1);
    });

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
                        total += count * price;
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
    }

    const max = product.flavors.length - 1;

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
                    {product.flavors.map((flavor, index) => (
                        <div className="option" key={flavor}>
                            <div className={'btns'}>
                                <Button className={`addBtn ${(cart[productId] && cart[productId].flavors[`${flavor}`]) ? classNames[`${flavor}`] : 'nonselected' }`} onClick={() => handleAddToCart(flavor)}>+</Button>
                                <Button className={`rmvBtn ${(cart[productId] && cart[productId].flavors[`${flavor}`]) ? classNames[`${flavor}`] : 'hidebtn'}`} onClick={() => handleRemoveFromCart(flavor)}>-</Button>
                            </div>
                            <div className={index === max ? "producttext last" : "producttext"}>
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