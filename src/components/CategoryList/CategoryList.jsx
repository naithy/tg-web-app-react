import React from 'react';
import './CategoryList.css';
import Categoriesitem from "../CategoryItem/Categoryitem";
import disposable from '../../pics/disposable.png'
import vape from '../../pics/vape.png'
import liquid from '../../pics/liquid.png'
import atomizer from '../../pics/atomizer.png'
import {useTelegram} from "../../hooks/useTelegram";

const categories = [
    {id: 'disposable', title: 'Одноразовые ЭС', img: disposable},
    {id: 'pods', title: 'POD Системы', img: vape},
    {id: 'liquid', title: 'Жидкости', img: liquid},
    {id: 'consumables', title: 'Расходники', img: atomizer}
]

const CategoryList = () => {
    const {tg} = useTelegram();
    tg.BackButton.hide()

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
