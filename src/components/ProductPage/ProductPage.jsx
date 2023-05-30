import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import button from "../Button/Button";

const productsData = [
    { title: 'gang box x 800', price: 900, flavors: ['vanilla', 'cherry', 'apple'] },
    { title: 'lost mary b5000', price: 1000, flavors: ['vanilla', 'cherry', 'blueberry'] },
    { title: 'voopoo', price: 950, flavors: ['mango'] },
    { title: 'vaporesso', price: 900 },
];


const ProductPage = () => {
    const totalPrice = parseFloat(localStorage.getItem('totalPrice'));

    const {tg, queryId} = useTelegram();

    if(totalPrice === 0) {
        tg.MainButton.hide();
        tg.MainButton.setParams({
            text: `Купить`,
            "color": "#31b545"
        })
    } else {
        tg.MainButton.setParams({text: `Купить ${totalPrice}`,
            "color": "#31b545"});
        tg.MainButton.show();
    }

    return (
        <div className={'list'}>
            {productsData.map((product, index) => (
                <div className={'HqdItem'}>
                    <a href={`/product/${index}`} className={'toItemPage'}>
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
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ProductPage;