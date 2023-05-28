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

    const [total, setTotal] = useState(localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : null);
    const [productCount, setProductCount] = useState(localStorage.getItem('tomatoCount') ? JSON.parse(localStorage.getItem('tomatoCount')) : null);

    const handleAdd = () => {
        if(productCount === null || total === null) {
            setProductCount(products[params.id - 1].price);
            setTotal(products[params.id - 1].price);
        } else {
            setProductCount(productCount + products[params.id - 1].price);
            setTotal(total + products[params.id - 1].price);
        }
    };
    const handleRemove = () => {
        if(productCount === null || total === null) {
            setProductCount(0);
            setTotal(0);
        } else {
            setProductCount(productCount - products[params.id - 1].price);
            setTotal(total - products[params.id - 1].price);
        }
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

    // useEffect для сохранения переменной total в localStorage
    useEffect(() => {
        localStorage.setItem('total', JSON.stringify(total));
    }, [total]);

    // useEffect для сохранения переменных в localStorage
    useEffect(() => {
        if (productCount !== null) {
            localStorage.setItem('productCount', JSON.stringify(productCount));
        }
        if (total !== null) {
            localStorage.setItem('total', JSON.stringify(total));
        }
    }, [productCount, total]);

    const params = useParams();
    const prodId = params.id;

    // const isMounted = React.useRef(false);
    //
    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const json = JSON.stringify(total)
    //         localStorage.setItem('total', json)
    //     }
    //     isMounted.current = true
    // }, [total]);

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