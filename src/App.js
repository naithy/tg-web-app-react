import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, Link} from "react-router-dom";
import CategoryList from "./components/CategoryList/CategoryList";
import HqdList from "./components/HqdList/HqdList";


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
        </Routes>
    </div>
  );
}

export default App;
