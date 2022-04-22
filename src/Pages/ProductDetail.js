import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToBasketThunk, getProductsThunk } from '../redux/actions';
import '../styles/product-detail.css';

const ProductDetail = () => {

    const { id } = useParams(  );
    const dispatch = useDispatch(  );
    const navigate = useNavigate(  );
    const [ currentImage, setCurrentImage ] = useState( 0 )
    const [ quantity, setQuantity ] = useState( 1 )
    const token = localStorage.getItem( 'token' )

    const nextSlide = (  ) => {
        setCurrentImage( currentImage === 2 ? 0 : currentImage + 1 )
    }
    const previousSlide = (  ) => {
        setCurrentImage( currentImage === 0 ? 2 : currentImage - 1 )
    }

    useEffect( (  ) => {
        dispatch( getProductsThunk(  ) )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [ dispatch ] )

    const products = useSelector( state => state.products )

    const productSelected = products.find( product => product.id === parseInt( id ) )

    const [ similarItems, setSimilarItems ] = useState( [  ] )

    useEffect( (  ) => {
        if ( productSelected ) {
            axios
                .get( `https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${ productSelected?.category.id }` )
                .then( ( res ) => {
                    setSimilarItems( res.data.data.products )
                } )
        }
    }, [ productSelected ] )

    const addToBasket = (  ) => {
        let aux = { id: productSelected.id, quantity: quantity };
        console.log( aux )
        dispatch( addProductToBasketThunk( aux ) )
    }
    
    return (
        <div className='product-detail'>
            <div className='route'>
                <span 
                    onClick={
                        (  ) => {
                            navigate( '/' )
                        }
                    }
                >
                    Home
                </span>
                &nbsp;&nbsp;<i className="fa-solid fa-greater-than"></i>&nbsp;&nbsp;
                <span>{ productSelected?.title }</span>
            </div>
            <div className='info-wrapper'>
                <div className='images-carousel'>
                    <i 
                        className="fa-solid fa-circle-chevron-left left"
                        onClick={ (  ) => {
                            previousSlide(  )
                        } }
                    >
                    </i>
                    <i 
                        className="fa-solid fa-circle-chevron-right right"
                        onClick={ (  ) => {
                            nextSlide(  )
                        } }
                    >                   
                    </i>
                    {
                        productSelected?.productImgs.map( ( img, index ) => (
                            <div
                                key={ img }
                                className={ index === currentImage ? 'slide active' : 'slide' }
                            >
                                {
                                    index === currentImage && (
                                        <img 
                                            src={ img } 
                                            alt={ productSelected?.title } 
                                        />
                                    )
                                }
                            </div>
                        ) )
                    }
                </div>
                <div className='details'>
                    <h2>{ productSelected?.title }</h2>
                    <p>{ productSelected?.description }</p>
                    <b>{ `$${productSelected?.price}` }</b>
                    <div className='quantity'>
                        <button
                            onClick={
                                (  ) => {
                                    if ( quantity > 1 ) {
                                        setQuantity( quantity - 1 )
                                    }
                                }
                            }
                        >
                            <i className="fa-solid fa-angle-down"></i>
                        </button>
                        <div>{ quantity }</div>
                        <button
                            onClick={
                                (  ) => {
                                    if ( quantity < 10 ) {
                                        setQuantity( quantity + 1 )
                                    }
                                }
                            }
                        >
                            <i className="fa-solid fa-angle-up"></i>
                        </button>
                    </div>
                    {
                        token ?
                            <button
                                className='learn-more'
                                onClick={
                                    (  ) => {
                                        addToBasket(  )
                                    }
                                }
                            >
                                <span className="circle" aria-hidden="true">
                                    <span className="icon arrow"><i className="fa-solid fa-basket-shopping"></i></span>
                                </span>
                                <span className="button-text"> Add to basket</span>
                            </button> :
                                <h3>Log in to purchase this product</h3>
                    }
                </div>
            </div>
            <div className='similar-items'>
                <ul className='products-list'>
                    {
                        similarItems.map( ( product ) => (
                            <li
                                key={ product.id }
                                className='product-card'
                                onClick={
                                    (  ) => {
                                        setQuantity( 1 );
                                        navigate( `/shop/${ product.id }` )
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }
                                }
                            >
                                <div className="imgs-wrapper">
                                    <img 
                                        className='front'
                                        src={ product.productImgs[ 2 ] }
                                        alt={ product.title }
                                    />
                                    <img
                                        className='back' 
                                        src={ product.productImgs[ 1 ] }
                                        alt={ product.title }
                                    />
                                </div>
                                <b>{ product.title }</b>
                                <span>{`$${ product.price }`}</span>
                                <button className='learn-more'>
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"><i className="fa-solid fa-basket-shopping"></i></span>
                                    </span>
                                    <span className="button-text"> Add to basket</span>
                                </button>
                            </li>
                        ) ) 
                    }
                </ul>
            </div>
        </div>
    );
};

export default ProductDetail;