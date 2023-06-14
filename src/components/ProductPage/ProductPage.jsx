import {useTelegram} from "../../hooks/useTelegram";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './ProductPage.css'
import {motion} from "framer-motion";
import ProductItem from "../ProductItem/ProductItem";

const ProductPage = () => {

    const [productsData, setProductsData] = useState([]);
    async function fetchData() {
        try {
            const response = await fetch("https://sakurashopsmr.ru/product?category=disposable");
            const data = await response.json();
            setProductsData(data);
        } catch (error) {
            console.log("Ошибка загрузки данных", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const {tg} = useTelegram();
    const history = useNavigate();

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
            <div className={'list'}>
                {productsData.map((product, index) => (
                    <div className={'HqdItem'} key={index}>
                        <Link to={`/product/${index}`} className={'toItemPage'} component={ProductItem}>
                            <div className={'hqdcontainer'}>
                                <div className={'product item'}>
                                    <img className={'hqdimg'} src={product.img} alt={'parilka'}/>
                                    <div className={'hqdcontainertext'}>
                                        <div className={`hqdtitle`}>{product.title}</div>
                                        {/*<div className={'description'}>{product.description}</div>*/}
                                        <div className={'price'}>
                                            <span>{product.price + 'р.'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProductPage;