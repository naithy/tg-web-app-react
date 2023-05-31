import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";


function App() {
    const {tg} = useTelegram()

    let requestParams = {
        'description': `VAPE`,
        'prices': sessionStorage.getItem('totalPrice'),
        'payload': `payload`,
    }


    let requestURL = new URL(`${window.location.origin}/create_invoice_link`);
    requestURL.searchParams.set('description', requestParams['description']);
    requestURL.searchParams.set('prices', requestParams['prices']);
    requestURL.searchParams.set('payload', requestParams['payload']);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.send();
    xhr.onload = function() {
        window.Telegram.WebApp.openInvoice(JSON.parse(xhr.response).result);
    }

    tg.enableClosingConfirmation();

    tg.MainButton.onClick(() => {
        xhr.open('GET', requestURL);
        xhr.send();
        xhr.onload = function() {
            window.Telegram.WebApp.openInvoice(JSON.parse(xhr.response).result);
        }
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
