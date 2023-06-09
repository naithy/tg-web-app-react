import React, {useCallback, useEffect, useState} from 'react';
import './Checkout.css'
import {useNavigate, useLocation} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import { IMaskInput } from 'react-imask';
const Checkout = () => {

    const {tg, user} = useTelegram();
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.addEventListener('popstate', handlePopstate);
        return () => window.removeEventListener('popstate', handlePopstate);
    }, []);

    const handlePopstate = () => {
        history(-1);
    }

    tg.BackButton.show()
    tg.BackButton.onClick(() => {
        history(-1);
    })

    const PhoneMask = "+{7} (000) 000-00-00";

    let Price = parseFloat(sessionStorage.getItem('totalPrice'));
    let Cart = JSON.parse(sessionStorage.getItem('cart'));

    const [birthdate, setBirthdate] = useState('');

    function checkAge(birthdate) {
        const [day, month, year] = birthdate.split('.').map(str => parseInt(str, 10));
        const birthdateObj = new Date(year, month - 1, day + 1);
        const ageDiffMs = Date.now() - birthdateObj.getTime();
        const ageDate = new Date(ageDiffMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
    }

    const [isAdult, setIsAdult] = useState();
    const [savedBirthday, setSavedBirthday] = useState('');
    const [savedNumber, setSavedNumber] = useState();
    const handleBirthdayComplete = (value) => {
        if (value.length < 10) {

        } else {
            setIsAdult(checkAge(value));
            setSavedBirthday(value);
            localStorage.setItem('isAdult', checkAge(value) || false)
            localStorage.setItem('savedBirthday', JSON.stringify(value))
            checkAndSetButton();
        }
    };

    const handleNumberComplete = (value) => {
        if (value.length < 18) {

        } else {
            setSavedNumber(value);
            localStorage.setItem('savedNumber', JSON.stringify(value))
            checkAndSetButton();
        }
    };

    useEffect(() => {
        const savedBirthdayValue = localStorage.getItem('savedBirthday');
        const savedNumberValue = localStorage.getItem('savedNumber');

        if (savedBirthdayValue) {
            setSavedBirthday(savedBirthdayValue);
        }

        if (savedNumberValue) {
            setSavedNumber(savedNumberValue);
        }
    }, []);

    useEffect(() => {
        checkAndSetButton();
    }, [isAdult, savedNumber])

    const checkAndSetButton = () => {
        if (!JSON.parse(localStorage.getItem('isAdult')) || !JSON.parse(localStorage.getItem('savedNumber'))) {
            tg.MainButton.hide();
        }

        if (JSON.parse(localStorage.getItem('isAdult')) && !!JSON.parse(localStorage.getItem('savedNumber'))) {
            tg.MainButton.setParams({
                text: `Оформить заказ ${Price} р.`,
                color: `#31b545`
            });
            tg.MainButton.show();
        }

    };

    const inputs = document.querySelectorAll('input[type=text]');
    inputs.forEach((input) => {
        input.addEventListener('blur', function() {
            setTimeout(() => {
                input.blur();
            }, 100);
        });
    });

    const onSendData = useCallback(() => {
        const data = {
            user,
            totalPrice: Price,
            cart: Cart,
            birthday: JSON.parse(localStorage.getItem('savedBirthday')),
            number: JSON.parse(localStorage.getItem('savedNumber'))
        }
        fetch('https://sakurashopsmr.ru/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [Cart])

    if (location.pathname !== '/checkout') {
        tg.MainButton.onClick(() => history('/checkout'));
    } else {
        useEffect(() => {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        },[onSendData])
    }

    return (
        <div className={'checkout'}>
            <div className={'ordertitle'}>
                <div className={'ordertitletext'}>Ваш заказ</div>
                <button className={'editorder'} onClick={() => history(-1)}>Изменить</button>
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
                    onAccept={(value) => {handleBirthdayComplete(value)}}
                    value={savedBirthday}
                />
                <IMaskInput
                    type={'tel'}
                    id={'numberinput'}
                    className={'numberinput'}
                    placeholder={'Телефон'}
                    mask={PhoneMask}
                    onAccept={(value) => {handleNumberComplete(value)}}
                    value={savedNumber}
                />
            </div>
        </div>
    );
};

export default Checkout;