import {useTelegram} from "../../hooks/useTelegram";
import {Link, useLocation, useNavigate} from "react-router-dom";
import button from "../Button/Button";
import React from "react";

const productsData = [
    { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'] },
    { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
    { title: 'voopoo', price: 950, flavors: ['mango'] },
    { title: 'vaporesso', price: 900 },
];



const ProductPage = () => {
    const history = useNavigate();
    const totalPrice = parseFloat(localStorage.getItem('totalPrice'));

    return (
        <div className={'list'}>
            <div className={'block'}>
                <button onClick={() => {history(-1)}}>Go back</button>
            </div>
            {productsData.map((product, index) => (
                <div className={'HqdItem'}>
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
    );
};

export default ProductPage;