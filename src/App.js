import './App.css';
import React, {useCallback, useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";

function App() {
    const {tg, queryId} = useTelegram();
    useEffect(() => {
        tg.ready();
    })

    let Price, Cart;

    const claimData = () => {
        Price = parseFloat(sessionStorage.getItem('totalPrice'));
        Cart = JSON.parse(sessionStorage.getItem('cart'));
    }

    const onSendData = useCallback(() => {
        console.log(queryId)
        claimData()
        const data = {
            queryId,
            totalPrice: Price,
            cart: Cart
        }
        fetch('https://sakurashopsmr.ru/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [Cart])



    tg.MainButton.onClick(tg.showAlert(queryId))
    tg.enableClosingConfirmation();


  return (
    <div className="App">
        <Routes>
            <Route index element={<CategoryList/>}/>
            <Route path="/hqd" element={<ProductPage/>}/>
            <Route path="/product/:productId" element={<ProductItem/>}/>
        </Routes>
        <button onClick={onSendData}>Send</button>
    </div>
  );
}

export default App;
