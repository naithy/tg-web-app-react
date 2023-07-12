import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {motion} from "framer-motion";

const Products = () => {
    const [products, setProducts] = useState([]);
    const {tg} = useTelegram();
    const history = useNavigate();
    const productsf = useLocation().state.productsTo;
    const brand = useLocation().state.brandFilter;

    tg.BackButton.onClick(() => {
        history(-1);
    })
    tg.BackButton.show()

    useEffect(() => {
        setProducts((productsf.filter(product => product.brand === brand)).sort());
    }, [productsf]);


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
                {products.map((product, index) => (
                    <div className={'HqdItem'} key={index}>
                        <Link to={`/product/${index}`} className={'toItemPage'} state={{product: products}}>
                            <div className={'hqdcontainer'}>
                                <div className={'product item'}>
                                    <img className={'hqdimg'} src={product.img} alt={'img'}/>
                                    <div className={'hqdcontainertext'}>
                                        <div className={`hqdtitle`}>{product.title}</div>
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

export default Products;
