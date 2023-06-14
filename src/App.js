import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, useNavigate} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";
import Checkout from "./components/Checkout/Checkout";

function App() {

    const [productsDataBD, setProductsDataBD] = useState([]);


    useEffect(() => {
        fetch('https://sakurashopsmr.ru/product?category=disposable')
            .then(response => response.json())
            .then(data => {
                setProductsDataBD(data);
            })
            .catch(error => console.error('Error fetching products:', error));

    }, []);

    const {tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    })

    tg.enableClosingConfirmation();
if (productsData.length === 0) {
    return <div>Loading... </div>
} else {
    return (
        <div className="App">
            <Routes>
                <Route index element={<CategoryList/>}/>
                <Route path="/hqd" element={<ProductPage productsDataBD={productsDataBD}/>}/>
                <Route path="/pod" element={<div className={'available'}>Скоро в продаже</div>}/>
                <Route path="/liquid" element={<div className={'available'}>Скоро в продаже</div>}/>
                <Route path="/atomizer" element={<div className={'available'}>Скоро в продаже</div>}/>
                <Route path="/product/:productId" element={<ProductItem productsDataBD={productsDataBD}/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Routes>
        </div>
    );
}

}

export default App;
