import React from 'react';
import './ProductItem.css'
import Button from "../Button/Button";

const ProductItem = ({product, productCount, onAdd, onRemove}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    const onRemoveHandler = () => {
        onRemove(product);
    }


    return (
        <div className={'productcontainer'}>
            <div className={'title'}>
                <h3 className={'underline'}>{product.title}</h3>
            </div>
            <div className={'choicecontainer'}>
                {(!!!product.option && product.count > 0) ? ((product.options).map(item => (
                    <div className={'option'}>
                        {productCount === 0 ? (
                            <Button className={'addBtn'} onClick={onAddHandler}>+</Button>
                        ) : (
                            <div className={'btns'}>
                                <Button className={'addBtn'} onClick={onAddHandler}>+</Button>
                                <Button className={'rmvBtn'} onClick={onRemoveHandler}>-</Button>
                            </div>
                        )}


                        <div className={'producttext'}>
                            <p>{item} {product.price}</p>
                        </div>
                    </div>)
                )) : <div>Нет в наличии</div>
                }
            </div>
            <a href={'/hqd'}>go back</a>
        </div>
    );
};

export default ProductItem;