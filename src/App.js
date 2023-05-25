import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, Link} from "react-router-dom";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import Form from "./components/Form/Form";


function App() {
    const {onToggleButton, tg} = useTelegram()

    useEffect(() => {
        tg.ready();
    })


  return (
    <div className="App">
        <Routes>
            <Route index element={<CategoriesList/>}/>
            <Route path="/hqd" element={<hqd/>}/>
            <Route path={'form'} element={<Form/>}/>
        </Routes>
    </div>
  );
}

export default App;
