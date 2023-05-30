import React from 'react';
import './Categoryitem.css';
import {Link, useLocation} from "react-router-dom";

const Categoryitem = ({category, className}) => {

    return (
        <Link className={'nextPage'} to={`/${category.id}`}>
            <div className={'category ' + className}>
                <div className={'categoryimg'}>
                    <img src={category.img}/>
                </div>
                <div className={'categorytitle'}>{category.title}</div>
            </div>
        </Link>
    );
};

export default Categoryitem;