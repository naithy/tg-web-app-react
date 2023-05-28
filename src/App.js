import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import HqdList from "./components/HqdList/HqdList";
import ProductPage from "./components/ProductPage/ProductPage";


function App() {
    const {onToggleButton, tg} = useTelegram()

    useEffect(() => {
        tg.ready();
    })

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
