import React from 'react';
import Button from "../Button/Button";
import './Categoriesitem.css';

const Categoriesitem = ({product, className}) => {

    return (
        <a className={'nextPage'} href={`/${product.id}`}>
            <div className={'product ' + className}>
                <div className={'img'}>
                    <img src={product.img}/>
                </div>
                <div className={'title'}>{product.title}</div>
            </div>
        </a>
    );
};

export default Categoriesitem;