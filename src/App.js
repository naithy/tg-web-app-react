import './App.css';
import React, {useCallback, useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";


function App() {
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            cart: JSON.parse(sessionStorage.cart),
            totalPrice: JSON.parse(sessionStorage.totalPrice)
        }
        fetch('77.105.172.20/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])


    tg.enableClosingConfirmation();

    tg.MainButton.onClick(() => {
    });

    useEffect(() => {
        tg.ready();
    })

  return (
    <div className="App">
        <Routes>
            <Route index element={<CategoryList/>}/>
            <Route path="/hqd" element={<ProductPage/>}/>
            <Route path="/product/:productId" element={<ProductItem/>}/>
        </Routes>
    </div>
  );
}

export default App;
