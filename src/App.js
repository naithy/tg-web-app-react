import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";


function App() {

    if(parseFloat(localStorage.getItem('totalPrice') === 0)) {
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: `Купить`,
            "color": "#31b545"
        })
    } else {
        tg.MainButton.setParams({text: `Купить ${localStorage.getItem('totalPrice')}`,
            "color": "#31b545"});
        tg.MainButton.show();
    }

    const {onToggleButton, tg} = useTelegram()

    useEffect(() => {
        tg.ready();
    })

  return (
    <div className="App">
        <Routes>
            <Route>
                <Route index element={<CategoryList/>}/>
                <Route path="/hqd" element={<ProductPage/>}/>
                <Route path="/product/:productId" element={<ProductItem/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
