import './App.css';
import React, {useCallback, useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, useNavigate} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";
import Checkout from "./components/Checkout/Checkout";

function App() {
    const history = useNavigate()

    const {tg, queryId, user, chat} = useTelegram();
    useEffect(() => {
        tg.ready();
    })

    let Price, Cart;

    const claimData = () => {
        Price = parseFloat(sessionStorage.getItem('totalPrice'));
        Cart = JSON.parse(sessionStorage.getItem('cart'));
    }

    const onSendData = useCallback(() => {
        claimData()
        const data = {
            queryId,
            user,
            totalPrice: Price,
            cart: Cart,
            chat
        }
        fetch('https://sakurashopsmr.ru/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [Cart])

    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', history('/checkout'))
    //     return () => {
    //         tg.offEvent('mainButtonClicked', history('/checkout'))
    //     }
    // },[])

    tg.MainButton.onClick(() => history('/checkout'));
    tg.enableClosingConfirmation();


  return (
    <div className="App">
        <Routes>
            <Route index element={<CategoryList/>}/>
            <Route path="/hqd" element={<ProductPage/>}/>
            <Route path="/pod" element={<div className={'available'}>Скоро в продаже</div>}/>
            <Route path="/liquid" element={<div className={'available'}>Скоро в продаже</div>}/>
            <Route path="/atomizer" element={<div className={'available'}>Скоро в продаже</div>}/>
            <Route path="/product/:productId" element={<ProductItem/>}/>
            <Route path="checkout" element={<Checkout/>}/>
        </Routes>
        <div>DOLBAEB</div>
    </div>
  );
}

export default App;
