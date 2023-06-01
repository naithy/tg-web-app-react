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
        claimData()
        const data = {
            totalPrice: Price,
            cart: Cart,
            queryId,
        }
        fetch('https://master--magical-moxie-a1c933.netlify.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
