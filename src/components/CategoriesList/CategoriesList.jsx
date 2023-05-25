import React from 'react';
import './CategoriesList.css';
import Categoriesitem from "../CategoriesItem/Categoriesitem";
import disposable from '../../pics/disposable.png'
import vape from '../../pics/vape.png'
import liquid from '../../pics/liquid.png'
import atomizer from '../../pics/atomizer.png'


const categories = [
    {id: 'hqd', title: 'Одноразовые ЭС', img: disposable},
    {id: 'pod', title: 'POD Системы', img: vape},
    {id: 'liquid', title: 'Жидкости', img: liquid},
    {id: 'atomizer', title: 'Испарители', img: atomizer}
]

const CategoriesList = () => {
    return (
        <div className={'list'}>
            {categories.map(item => (
                <Categoriesitem
                    product={item}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default CategoriesList;