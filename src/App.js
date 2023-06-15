import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";
import Checkout from "./components/Checkout/Checkout";
import {TailSpin} from "react-loader-spinner";

function App() {
    const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--tg-theme-button-color')

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

    console.log(productsData)

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
                    <Route path="/disposable" element={<ProductPage productsData={productsData}/>}/>
                    <Route path="/pods" element={<ProductPage productsData={productsData}/>}/>
                    <Route path="/liquid" element={<ProductPage productsData={productsData}/>}/>
                    <Route path="/consumables" element={<ProductPage productsData={productsData}/>}/>
                    <Route path="/product/:productId" element={<ProductItem productsData={productsData}/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                </Routes>
            </div>
     );
    } else {
        return <div className={'loader'}>
            <TailSpin
                height="80"
                width="80"
                color={`${color}`}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
}

export default App;
