import React, {useEffect, useState} from 'react';
import './Checkout.css'
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {DatePicker} from "@skbkontur/react-ui";

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
            <DatePicker
                enableTodayLink
            />
            {/*<input*/}
            {/*    type="date"*/}
            {/*    className="form-control shadow-none"*/}
            {/*    placeholder="mm/dd/yyyy"*/}
            {/*    aria-describedby="button-addon2"*/}
            {/*    onChange={onChange}*/}
            {/*/>*/}
        </div>
    );
};

export default Checkout;