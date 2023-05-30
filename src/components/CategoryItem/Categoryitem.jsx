import React from 'react';
import './Categoryitem.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

const Categoryitem = ({category, className}) => {
    const {state} = useLocation();

    return (
        <Link className={'nextPage'} to={`/${category.id}`} state={state}>
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