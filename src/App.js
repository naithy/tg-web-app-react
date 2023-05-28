import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, useParams} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import HqdList, {products} from "./components/HqdList/HqdList";
import ProductItem from "./components/ProductItem/ProductItem";
import HqdItem from "./components/HqdItem/HqdItem";
import ProductPage from "./components/ProductPage/ProductPage";




function App() {
    const {onToggleButton, tg} = useTelegram()

    useEffect(() => {
        tg.ready();
    })

    // function Product(){
    //
    //
    //
    //
    //     const params = useParams();
    //     const prodId = params.id;
    //     return (
    //         <ProductItem
    //             product = {products[params.id - 1]}
    //         />
    //     );
    // }

  return (
    <div className="App">
        <Routes>
            <Route index element={<CategoryList/>}/>
            <Route path="/hqd" element={<HqdList/>}/>
            <Route path="/hqd/:id" element={<ProductPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
