import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, useNavigate} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";
import Checkout from "./components/Checkout/Checkout";

function App() {

    const [productsData, setProductsData] = useState([]);
    const [isFetched, setIsFetched] = useState(false)
    async function fetchData() {
        try {
            const response = await fetch("https://sakurashopsmr.ru/product?category=disposable");
            const data = await response.json();
            setProductsData(data);
        } catch (error) {
            console.log("Ошибка загрузки данных", error);
        }
    }

    useEffect(async () => {
        await fetchData()
        setIsFetched(true)
    }, []);

    const {tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    })

    tg.enableClosingConfirmation();

    if (isFetched) {

        return (
            <div className="App">
                <Routes>
                    <Route index element={<CategoryList/>}/>
                    <Route path="/hqd" element={<ProductPage productsData={productsData}/>}/>
                    <Route path="/pod" element={<div className={'available'}>Скоро в продаже</div>}/>
                    <Route path="/liquid" element={<div className={'available'}>Скоро в продаже</div>}/>
                    <Route path="/atomizer" element={<div className={'available'}>Скоро в продаже</div>}/>
                    <Route path="/product/:productId" element={<ProductItem productsData={productsData}/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                </Routes>
            </div>
     );
    } else {
       return <div>Loading...</div>
    }
}

export default App;
