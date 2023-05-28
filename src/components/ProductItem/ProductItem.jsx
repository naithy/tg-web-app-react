import React from 'react';
import './ProductItem.css'
import Button from "../Button/Button";

const ProductItem = ({product, onAdd, onRemove}) => {

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
                        <Button className={'addBtn'} onClick={onAddHandler}>+</Button>
                        <Button className={'rmvBtn'} onClick={onRemoveHandler}>-</Button>
                        <div className={'producttext'}>
                            <p>{item} {product.price}</p>
                        </div>
                    </div>)
                )) : <div>Нет в наличии</div>
                }
            </div>
        </div>
    );
};

export default ProductItem;