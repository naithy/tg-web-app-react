import React, { useState } from 'react';

function App() {
    const PRODUCTS = [
        { id: 1, name: 'Тыква', price: 5 },
        { id: 2, name: 'Огурец', price: 1 },
        { id: 3, name: 'Помидор', price: 2 }
    ];

    const [items, setItems] = useState(PRODUCTS.map(product => ({ ...product, counts: 0 })));
    const [subtotal, setSubtotal] = useState(0);

    const handleAdd = (id) => {
        const index = items.findIndex(item => item.id === id);
        const newItems = [...items];
        newItems[index].counts += newItems[index].price;
        setItems(newItems);
        setSubtotal(subtotal + newItems[index].price);
    };

    const handleRemove = (id) => {
        const index = items.findIndex(item => item.id === id);
        const newItems = [...items];
        newItems[index].counts -= newItems[index].price;
        setItems(newItems);
        setSubtotal(subtotal - newItems[index].price);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    {item.count === 0 ? (
                        <button onClick={() => handleAdd(item.id)}>Добавить</button>
                    ) : (
                        <div>
                            <button onClick={() => handleAdd(item.id)}>Добавить</button>
                            <button onClick={() => handleRemove(item.id)}>Убрать</button>
                            <p>Количество: {item.count / item.price}</p>
                            <p>Итого: ${item.count}</p>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <h2>Добавить свой товар</h2>
                <input type="text" name="id" placeholder="ID" value={customProduct.id} onChange={handleCustomProductChange} />
                <input type="text" name="name" placeholder="Название" value={customProduct.name} onChange={handleCustomProductChange} />
                <input type="text" name="price" placeholder="Цена" value={customProduct.price} onChange={handleCustomProductChange} />
                <button onClick={handleCustomProductAdd}>Добавить</button>
            </div>
            <div>
                <p>Итоговая сумма: ${subtotal}</p>
            </div>
        </div>
    );
}

export default App;