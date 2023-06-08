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

    const [birthdate, setBirthdate] = useState('');

    function checkAge(birthdate) {
        const [day, month, year] = birthdate.split('.').map(str => parseInt(str, 10));
        const birthdateObj = new Date(year, month - 1, day + 1);
        const ageDiffMs = Date.now() - birthdateObj.getTime();
        const ageDate = new Date(ageDiffMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
    }

    const [isAdult, setIsAdult] = useState(false);
    const [savedBirthday, setSavedBirthday] = useState('');
    const [savedNumber, setSavedNumber] = useState('');
    const handleBirthdayComplete = (value) => {
        setIsAdult(checkAge(value));
        setSavedBirthday(value);
        checkAndSetButton();
    };

    const handleNumberComplete = (value) => {
        setSavedNumber(value);
        checkAndSetButton();
    };

    const checkAndSetButton = () => {
        if (!isAdult || !savedNumber) {
            tg.MainButton.hide();
        } else {
            console.log("GOOOOOOOO")
            tg.MainButton.setParams({
                text: `Посмотреть заказ`,
                color: `#31b545`
            });
            tg.MainButton.show();
        }
    };

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
                    onComplete={(value) => {isAdult = checkAge(value)
                        savedBirthday = value

                    }}
                />
                <IMaskInput
                    type={'tel'}
                    id={'numberinput'}
                    className={'numberinput'}
                    placeholder={'Телефон'}
                    mask={PhoneMask}
                    onComplete={(value) => {savedNumber = value

                    }}
                />
            </div>
        </div>
    );
};

export default Checkout;