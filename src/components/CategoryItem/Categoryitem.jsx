import React from 'react';
import './Categoryitem.css';

const Categoryitem = ({category, className}) => {

    return (
        <a className={'nextPage'} href={`/${category.id}`}>
            <div className={'category ' + className}>
                <div className={'categoryimg'}>
                    <img src={category.img}/>
                </div>
                <div className={'categorytitle'}>{category.title}</div>
            </div>
        </a>
    );
};

export default Categoryitem;