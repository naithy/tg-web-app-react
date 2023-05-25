import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd, onRem}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    const onRemHandler = () => {
        onRem(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'} style={{backgroundImage: `url(${product.img})`, width: `150px`}}/>
            <div className={'container'}>
                <div className={'title'}>{product.title}</div>
                <div className={'description'}>{product.description}</div>
                <div className={'price'}>
                    <span>Стоимость: <b>{product.price}</b></span>
                </div>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить
            </Button>
        </div>
    );
};

export default ProductItem;