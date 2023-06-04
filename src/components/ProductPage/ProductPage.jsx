import {useTelegram} from "../../hooks/useTelegram";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import './ProductPage.css'

const productsData = [
    { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'],
        img: 'https://sun9-66.userapi.com/impg/daUL-0rsVWF4iFxoIBNOpsYf93LJ_8yOyCnTkA/Qr3P8UJK2_I.jpg?size=1280x1280&quality=96&sign=10b465a1219b01ac2e85cd7a3ee6ebc1&type=album'
    },
    { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
    { title: 'voopoo', price: 950, flavors: ['mango'] },
    { title: 'vaporesso', price: 900 },
];

const ProductPage = () => {
    const {tg} = useTelegram();
    const history = useNavigate();

        tg.BackButton.onClick(() => {
            history(-1);
        })
        tg.BackButton.show()

    return (
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
    );
};

export default ProductPage;