import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../redux/actions';
import '../styles/purchases.css'

const Purchases = () => {

    const dispatch = useDispatch(  );
    const navigate = useNavigate(  );

    useEffect( (  ) => {
        dispatch( getPurchasesThunk(  ) )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [ dispatch ] )

    const products = useSelector( state => state.purchases );

    return (
        <div className='purchases-screen'>
            <h1>Purchases</h1>
            <ul id='purchases-list'>
                {
                    products.length > 0 ?
                        <>
                            {
                                products.map( ( date ) => (
                                    <details
                                        key={ date.id }
                                        className='purchase-date'
                                    >
                                        <summary>{ date.createdAt.slice( 0, date.createdAt.lastIndexOf( ':' ) ).replace( 'T', ' ~ ' ).replace( '-', '/' ).replace( '-', '/' ).replace( '-', '/' ).replace( '~', '-' ) }</summary>
                                        {
                                            date.cart.products.map( ( product ) => (
                                                <ul key={ product.id }>
                                                    <p
                                                        onClick={ (  ) => {
                                                            navigate( `/shop/${ product.id }` )
                                                        } }
                                                    >
                                                        <b>Product: </b>{ product.title }
                                                    </p>
                                                    <p><b>Brand: </b>{ product.brand }</p>
                                                    <p><b>Price per unit: </b>{`$${ product.price }`}</p>
                                                    <p><b>Units purchased: </b>{ product.productsInCart.quantity }</p>
                                                    <p><b>Total for this product: </b>{ `$${ ( product.price * product.productsInCart.quantity )}` }</p>
                                                </ul>
                                            ) )
                                        }
                                    </details>
                                ) )
                            }
                        </> :
                            <>
                                <h3>You haven't purchased a product yet</h3>
                            </>
                }
            </ul>

        </div>
    );
};

export default Purchases;