import React from 'react';

const ProductList = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'} style={{backgroundImage: `url(${product.img})`, width: `150px`}}/>
            <div className={'container'}>
                <div className={'title'}>{product.title}</div>
                {/*<div className={'description'}>{product.description}</div>*/}
                <div className={'price'}>
                    <span>{product.price + '₽'}</span>
                </div>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить
            </Button>
        </div>
    );
};

export default ProductList;