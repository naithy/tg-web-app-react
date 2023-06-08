import React from 'react';
import './Checkout.css'
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";

const Checkout = () => {

    const {tg} = useTelegram();
    const history = useNavigate();

    tg.BackButton.onClick(() => {
        history(-1);
    })

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertext'}>Ваш заказ</div>
                <button className={'editorder'}>Изменить</button>
            </div>
        </div>
    );
};

export default Checkout;