import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterCategoryThunk, getCategoriesThunk, getProductsThunk, submitQueryThunk } from '../redux/actions';
import '../styles/home.css';

const Home = (  ) => {

    const dispatch = useDispatch(  );
    const products = useSelector( state => state.products )
    const categories = useSelector( state => state.categories )
    const [ isTherePriceRange, setIsTherePriceRange ] = useState( false )
    const [ minPrice, setMinPrice ] = useState( 0 )
    const [ maxPrice, setMaxPrice ] = useState( 999999999999999 )
    const [ rangedProducts, setRangedProducts ] = useState( [  ] )
    const [ query, setQuery ] = useState( '' )
    const [ autocomplete, setAutocomplete ] = useState( [  ] )

    const eventListener = (  ) => {
        setAutocomplete( [  ] )
    }

    useEffect( (  ) => {
        window.addEventListener( 'click', eventListener)
        dispatch( getProductsThunk(  ) )
        dispatch( getCategoriesThunk(  ) )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return (  ) => window.removeEventListener( 'click', eventListener )
    }, [ dispatch ] );

    const submitPriceRange = ( e ) => {
        e.preventDefault(  )
        setRangedProducts( [  ] )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if ( minPrice !== 0 || maxPrice !== 999999999999999 ) {
            let aux = [  ]
            for ( let i = 0; i < products.length; i++ ) {
                if ( parseInt( products[ i ].price ) >= minPrice && parseInt( products[ i ].price ) <= maxPrice ) {
                    aux.push( products[ i ] )
                }
            }
            setRangedProducts( aux )
            setIsTherePriceRange( true )
        }
        else {
            setIsTherePriceRange( false )
        }
    }

    const submitQuery = ( e ) => {
        e.preventDefault(  )
        dispatch( submitQueryThunk( query ) )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleFilter = ( e ) => {
        if ( e.length === 0 ) {
            setAutocomplete( [  ] )
            dispatch( getProductsThunk(  ) )
        }
        else {
            const querySearch = e.toLowerCase(  )
            const newFilter = products.filter( ( product ) => {
                return product.title.toLowerCase(  ).includes( querySearch )
            } )
            setAutocomplete( newFilter )
        }
    }

    const handleCategory = ( e ) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if ( e === "All" ) {
            dispatch( getProductsThunk(  ) )
            setMinPrice( 0 )
            setMaxPrice( 999999999999999 )
            setRangedProducts( [  ] )
            setIsTherePriceRange( false )
            setQuery( '' )
        }
        else {
            dispatch( filterCategoryThunk( e ) )
            setMinPrice( 0 )
            setMaxPrice( 999999999999999 )
            setRangedProducts( [  ] )
            setIsTherePriceRange( false )
            setQuery( '' )
        }
    }

    const navigate = useNavigate(  );

    return (
        <div className='home'>
            <div className='filters-mobile'>
                <form 
                    className="query-container"
                    onSubmit={
                        ( e ) => {
                            submitQuery( e )
                        }
                    }
                >
                     <div className="search-box">
                        <input 
                            type="text"
                            placeholder='Search here'
                            className='query'
                            onChange={
                                ( e ) => {
                                    setQuery( e.target.value )
                                    handleFilter( e.target.value )
                                }
                            }
                            value={ query }
                        />
                        <button
                            type='submit'
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    {
                        autocomplete.length > 0 && 
                            <ul className='autocomplete'>
                                { autocomplete.map( ( item ) => (
                                    <li
                                        className='item'
                                        key={ item.id }
                                        onClick={
                                            (  ) => {
                                                dispatch( submitQueryThunk( item.title ) )
                                                setQuery( item.title )
                                            }
                                        }
                                    >
                                        { item.title }
                                    </li>
                                ) ) }
                            </ul>
                    }
                </form>
                <select
                    className='Categories'
                    onChange={
                        ( e ) => {
                            handleCategory( e.target.value )
                        }
                    }
                >
                    <option
                        className='category'
                        value='All'
                    >
                        All
                    </option>
                    { categories.map( ( category ) => (
                        <option
                            key={ category.id }
                            className='category'
                            value={ category.id }
                        >
                            { category.name }
                        </option>
                    ) ) }
                </select>
                <form 
                    className='price-range'
                    onSubmit={ ( e ) => {
                        submitPriceRange( e )
                    } }
                >
                    <div className="ranges">
                        <div className='range-container'>
                            <label htmlFor="min-price-mobile">Min price $</label>
                            <input 
                                type="number"
                                placeholder=' min'
                                id='min-price-mobile'
                                onChange={ ( e ) => {
                                    setMinPrice( e.target.value )
                                } }
                            />
                        </div>
                        <div className='range-container'>
                            <label htmlFor="max-price-mobile">Max price $</label>
                            <input 
                                type="number"
                                placeholder=' max'
                                id='max-price-mobile'
                                onChange={ ( e ) => {
                                    setMaxPrice( e.target.value )
                                } }
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                    >
                        Apply
                    </button>
                </form>
            </div>
            <div className='filters-desktop'>
                <form 
                    className="query-container"
                    onSubmit={
                        ( e ) => {
                            submitQuery( e )
                        }
                    }
                >
                    <div className="search-box">
                        <input 
                            type="text"
                            placeholder='Search here'
                            className='query'
                            onChange={
                                ( e ) => {
                                    setQuery( e.target.value )
                                    handleFilter( e.target.value )
                                }
                            }
                            value={ query }
                        />
                        <button
                            type='submit'
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    {
                        autocomplete.length > 0 && 
                            <ul className='autocomplete'>
                                { autocomplete.map( ( item ) => (
                                    <li
                                        className='item'
                                        key={ item.id }
                                        onClick={
                                            (  ) => {
                                                dispatch( submitQueryThunk( item.title ) )
                                                setQuery( item.title )
                                            }
                                        }
                                    >
                                        { item.title }
                                    </li>
                                ) ) }
                            </ul>
                    }
                </form>
                <ul className='categories'>
                    <h2>Categories</h2>
                    <li
                        className='category'
                        onClick={ (  ) => {
                            dispatch( getProductsThunk(  ) )
                            setMinPrice( 0 )
                            setMaxPrice( 999999999999999 )
                            setRangedProducts( [  ] )
                            setIsTherePriceRange( false )
                            setQuery( '' )
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        } }
                    >
                        <p>All</p>
                    </li>
                    { categories.map( ( category ) => (
                        <li
                            key={ category.id }
                            className='category'
                            onClick={ (  ) => {
                                dispatch( filterCategoryThunk( category.id ) )
                                setMinPrice( 0 )
                                setMaxPrice( 999999999999999 )
                                setRangedProducts( [  ] )
                                setIsTherePriceRange( false )
                                setQuery( '' )
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            } }
                        >
                            <p>{ category.name }</p>
                        </li>
                    ) ) }
                </ul>
                <form 
                    className='price-range'
                    onSubmit={ ( e ) => {
                        submitPriceRange( e )
                    } }
                >
                    <div className='range-container'>
                        <label htmlFor="min-price-desktop">Min price $</label>
                        <input 
                            type="number"
                            placeholder='Enter an amount'
                            id='min-price-desktop'
                            onChange={ ( e ) => {
                                setMinPrice( e.target.value )
                            } }
                        />
                    </div>
                    <div className='range-container'>
                        <label htmlFor="max-price-desktop">Max price $</label>
                        <input 
                            type="number"
                            placeholder='Enter an amount'
                            id='max-price-desktop'
                            onChange={ ( e ) => {
                                setMaxPrice( e.target.value )
                            } }
                        />
                    </div>
                    <button
                        type='submit'
                    >
                        Apply
                    </button>
                </form>
            </div>
            <ul className='products-list'>
                { 
                    products.length === 0 &&
                        <div className="not-found">
                            <h1>
                                We are so ashamed, it seems like we don't have that kind of product right now, try again later please.
                            </h1>
                            <img src="/assets/imgs/not_found.png" alt="ballon floating" />
                        </div>
                }
                {
                    isTherePriceRange &&
                        rangedProducts.map( ( product ) => (
                            <li
                                key={ product.id }
                                className='product-card'
                                onClick={
                                    (  ) => {
                                        navigate( `/shop/${ product.id }` )
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
                {
                    isTherePriceRange === false &&
                        products.map( ( product ) => (
                            <li
                                key={ product.id }
                                className='product-card'
                                onClick={
                                    (  ) => {
                                        navigate( `/shop/${ product.id }` )
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
    );
};

export default Home;