import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    const productsf = useLocation().state.productsTo;
    const brand = useLocation().state.brandFilter;
    console.log(productsf)

    useEffect(() => {
        setProducts(productsf.filter(product => product.brand === brand));
    }, [productsf]);


    return (
        <div className={'list'}>
            {products.map((product, index) => (
                <div className={'HqdItem'} key={index}>
                    <Link to={`/product/${index}`} className={'toItemPage'} state={{product: products}}>
                        <div className={'hqdcontainer'}>
                            <div className={'product item'}>
                                <img className={'hqdimg'} src={product.img} alt={'parilka'}/>
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
    );
};

export default Products;