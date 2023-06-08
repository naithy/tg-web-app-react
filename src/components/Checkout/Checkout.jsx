import React from 'react';
import './Checkout.css'

const Checkout = () => {
    return (
        <div>
            <div className={'ordertitle'}>
                <div className={'ordertext'}>Ваш заказ</div>
                <button className={'editorder'}>Изменить</button>
            </div>
        </div>
    );
};

export default Checkout;