import React, {useEffect, useState} from 'react';
import './Checkout.css'
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";

const Checkout = () => {

    const {tg} = useTelegram();
    const history = useNavigate();

    useEffect(() => {
        window.addEventListener('popstate', handlePopstate);
        return () => window.removeEventListener('popstate', handlePopstate);
    }, []);

    const handlePopstate = () => {
        history(-1);
    }

    tg.BackButton.onClick(() => {
        history(-1);
    })

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertext'}>Ваш заказ</div>
                <button className={'editorder'}>Изменить</button>
            </div>
            <input type={"date"} className={"datepicker-input"}/>
        </div>
    );
};

export default Checkout;