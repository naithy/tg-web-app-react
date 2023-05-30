import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductItem from "./components/ProductItem/ProductItem";


function App() {
    const {tg} = useTelegram()

    tg.MainButton.onClick(tg.openInvoice())

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
