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

    const PhoneMask = "+{7} (000) 000-00-00";

    let Price = parseFloat(sessionStorage.getItem('totalPrice'));
    let Cart = JSON.parse(sessionStorage.getItem('cart'));

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertitletext'}>Ваш заказ</div>
                <button className={'editorder'} onClick={history(-1)}>Изменить</button>
            </div>
            <div className={'order'}>
                {Object.keys(Cart).map((key) =>
                <div className={'ordertext'} key={key}>
                    <h4>{Cart[key].title}</h4>
                    {Object.entries(Cart[key].flavors).map(([name, amount]) =>(
                        <div className={'orderproduct'}>
                            <div className={'orderproducttext'}>  • {name} <span className="colortext">{amount}x</span></div>
                            <div className={'totalprice'}>{amount >= 3 ? (parseFloat(Cart[key].price) - 100) * amount + ' р.': parseFloat(Cart[key].price) * amount + ' р.'}</div>
                        </div>
                    ))}
                </div>)}
            </div>
            <div className={'inputs'}>
                <IMaskInput
                    type={'tel'}
                    id={'dateinput'}
                    className={'dateinput'}
                    placeholder={'Дата рождения (ДД.ММ.ГГГГ)'}
                    mask={Date}
                />
                <IMaskInput
                    type={'tel'}
                    id={'numberinput'}
                    className={'numberinput'}
                    placeholder={'Телефон'}
                    mask={PhoneMask}
                />
            </div>
        </div>
    );
};

export default Checkout;