import React, {useEffect, useState} from 'react';
import './Checkout.css'
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import { IMaskInput } from 'react-imask';

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

    const [date, setDate] = useState(new Date())

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertext'}>Ваш заказ</div>
                <button className={'editorder'}>Изменить</button>
            </div>
            <IMaskInput
                id={"dateinput"}
                className={'dateinput'}
                placeholder={'Дата рождения (ДД.ММ.ГГГГ)'}
                mask={Date}
            />
            <IMaskInput
                id={"numberinput"}
                className={'numberinput'}
                placeholder={'Телефон'}
                mask={Number}
            />
        </div>
    );
};

export default Checkout;