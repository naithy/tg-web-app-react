import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            phoneNumber,
        }
        tg.sendData(JSON.stringify(data));
    }, [name, phoneNumber])

    useEffect(() => {
      tg.WebApp.onEvent('mainButtonClicked', onSendData())
        return () => {
         tg.WebApp.offEvent('mainButtonClicked', onSendData())
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправтиь данные'
        })
    }, [])

    useEffect(() => {
        if (!name || !phoneNumber) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    })
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Номер телефона'}
                value={phoneNumber}
                onChange={onChangePhoneNumber}
            />
        </div>
    );
};

export default Form;