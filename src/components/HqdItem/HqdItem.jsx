import React from 'react';
import './HqdItem.css';
import {useNavigate} from "react-router-dom";

const HqdItem = ({product, className, onAdd}) => {
    const history = useNavigate()
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <a onClick={() => history(product.id)} className={'toItemPage'}>
            <div className={'hqdcontainer'}>
                <div className={'product ' + className}>
                    <img className={'hqdimg'} src={product.img}/>
                    <div className={'hqdcontainertext'}>
                        <div className={`hqdtitle`}>{product.title}</div>
                        {/*<div className={'description'}>{product.description}</div>*/}
                        <div className={'price'}>
                            <span>{product.price + 'р.'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default HqdItem;