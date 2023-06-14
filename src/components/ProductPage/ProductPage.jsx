import {useTelegram} from "../../hooks/useTelegram";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './ProductPage.css'
import {motion} from "framer-motion";


const productsData = [
    { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'],
        img: 'https://sun9-66.userapi.com/impg/daUL-0rsVWF4iFxoIBNOpsYf93LJ_8yOyCnTkA/Qr3P8UJK2_I.jpg?size=1280x1280&quality=96&sign=10b465a1219b01ac2e85cd7a3ee6ebc1&type=album'
    },
    { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
    { title: 'voopoo', price: 950, flavors: ['mango'] },
    { title: 'vaporesso', price: 900 },
];



const ProductPage = () => {

    const [productsData2, setProductsData] = useState([]);

useEffect(() => {
    fetch('/product?category=disposable')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching products:', e));

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
                        <Link to={`/product/${index}`} className={'toItemPage'}>
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