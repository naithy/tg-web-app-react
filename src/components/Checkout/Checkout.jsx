import React, {useEffect} from 'react';
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

    const onChange = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
    }

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertext'}>Ваш заказ</div>
                <button className={'editorder'}>Изменить</button>
                <input
                    type="date"
                    className="form-control shadow-none"
                    placeholder="mm/dd/yyyy"
                    aria-describedby="button-addon2"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Checkout;