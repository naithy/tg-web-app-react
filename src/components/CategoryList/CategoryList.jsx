import React from 'react';
import './CategoryList.css';
import Categoriesitem from "../CategoryItem/Categoryitem";
import disposable from '../../pics/disposable.png'
import vape from '../../pics/vape.png'
import liquid from '../../pics/liquid.png'
import atomizer from '../../pics/atomizer.png'
import AnimatedPage from "../../AnimatedPage";


const categories = [
    {id: 'hqd', title: 'Одноразовые ЭС', img: disposable},
    {id: 'pod', title: 'POD Системы', img: vape},
    {id: 'liquid', title: 'Жидкости', img: liquid},
    {id: 'atomizer', title: 'Испарители', img: atomizer}
]

const CategoryList = () => {
    return (
        <div className={'list'}>
            {categories.map(item => (
                <Categoriesitem
                    category={item}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default CategoryList;