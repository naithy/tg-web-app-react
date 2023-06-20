import {useTelegram} from "../../hooks/useTelegram";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import '../Products/Product.css'
import './ProductPage.css'

const ProductPage = ({productsData}) => {
    const location = useLocation().pathname.slice(1)
    const {tg} = useTelegram();
    const history = useNavigate();
    const productsDataFiltered = productsData.filter(product => product.category === `${location}`);

    const [products, setProducts] = useState([]);
    const brands = [...new Set(productsDataFiltered.map(item => item.brand))]

    tg.BackButton.onClick(() => {
        history(-1);
    })
    tg.BackButton.show()

    const  animations = {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
    }

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.5}}
        >
            <div className={'brandlist'}>
                {(productsDataFiltered.length) === 0 ? 'Скоро в продаже' :
                brands.map(product => (
                    <Link to={`/products/`} className={'toItemPage'} state={{productsTo: productsDataFiltered, brandFilter: product}}>
                        <div className={'brand'}>
                            <div>{product}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default ProductPage;