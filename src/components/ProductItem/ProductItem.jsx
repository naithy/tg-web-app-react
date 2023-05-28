import React from 'react';
import './ProductItem.css'

const ProductItem = ({product}) => {


    return (
        <div className={'productcontainer'}>
            <div className={'title'}>
                <h3 className={'underline'}>{product.title}</h3>
            </div>
            <div className={'choicecontainer'}>
                {(!!!product.option && product.count > 0) ? ((product.options).map(item => (
                    <div className={'option'}>
                        <button className={'addBtn'}>+</button>
                        <div className={'producttext'}>
                            <p>{item}</p>
                        </div>
                    </div>)
                )) : <div>Нет в наличии</div>
                }
            </div>
        </div>
    );
};

export default ProductItem;