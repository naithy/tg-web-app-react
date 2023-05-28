import React, { useState } from 'react';

function App() {

    // Объект с данными о товаре "Помидор"
    const tomato = { id: 1, name: 'Помидор', price: 2 };

    // Создаем состояние для суммы товаров
    const [total, setTotal] = useState(0);

    // Создаем состояние для количества "Помидоров" в корзине
    const [tomatoCount, setTomatoCount] = useState(0);

    // Функция для добавления "Помидора" в корзину
    const handleAddTomato = () => {
        setTomatoCount(tomatoCount + tomato.price);
        setTotal(total + tomato.price);
    };

    // Функция для удаления "Помидора" из корзины
    const handleRemoveTomato = () => {
        setTomatoCount(tomatoCount - tomato.price);
        setTotal(total - tomato.price);
    };

    return (
        <div>
            <h2>Товары:</h2>
            <div>
                <h3>{tomato.name}</h3>
                <p>Цена: ${tomato.price}</p>

                {tomatoCount === 0 ? (
                    // Если в корзине нет "Помидоров", показываем кнопку "Добавить"
                    <button onClick={handleAddTomato}>Добавить</button>
                ) : (
                    // Если в корзине есть "Помидоры", показываем количество и кнопки "Добавить" и "Убрать"
                    <div>
                        <button onClick={handleAddTomato}>Добавить</button>
                        <button onClick={handleRemoveTomato}>Убрать</button>
                        <p>Количество: {tomatoCount / tomato.price}</p>
                    </div>
                )}

            </div>

            <h2>Итого: ${total}</h2>
        </div>
    );
}

export default App;