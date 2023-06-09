import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";
import Checkout from "./components/Checkout/Checkout";

function App() {
    const history = useNavigate();
    const location = useLocation();

    const {tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    })

    useEffect(() => {
        tg.onEvent('mainButtonClicked', history('/checkout'))
        return () => {
            tg.offEvent('mainButtonClicked', history('/checkout'))
        }
    })

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
            <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
    </div>
  );
}

export default App;
