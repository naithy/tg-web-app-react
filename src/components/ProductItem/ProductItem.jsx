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
            <div className={'img'}/>
            <img width={'150px'} src={product.img}/>
            <div className={'container'}>
                <div className={'container-text'}>
                    <div className={'title'}>{product.title}</div>
                    <div className={'description'}>{product.description}</div>
                    <div className={'price'}>
                        <span>Стоимость: <b>{product.price}</b></span>
                    </div>
                </div>
                <Button className={'add-btn'} onClick={onAddHandler}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235.997.997
                        0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18
                        17H7.016a.993.993 0 0 1-.675-.248.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm9
                        0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1
                        0 1 1 0-2h1V3a1 1 0 0 1 1-1z" fill="white"></path></svg>
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;