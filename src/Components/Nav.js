import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserThunk, deleteProductFromBasketThunk, getBasketProductsThunk, loginThunk, purchaseCartThunk, setDoLoginFailedThunk, setIsLoggedThunk } from '../redux/actions';
import '../styles/nav.css'

const Nav = () => {

    const navigate = useNavigate(  )
    const dispatch = useDispatch(  )
    const isLogged = useSelector( state => state.isLogged )
    const doLoginFailed = useSelector( state => state.doLoginFailed )
    const [ loginState, setLoginState ] = useState( false )
    const [ createAccountState, setCreateAccountState ] = useState( false )
    const [ basketState, setBasketState ] = useState( false )
    const [ logEmail, setLogEmail ] = useState( "" )
    const [ logPassword, setLogPassword ] = useState( "" )
    const [ createFirstName, SetCreateFirstName ] = useState( "" )
    const [ createLastName, SetCreateLastName ] = useState( "" )
    const [ createEmail, SetCreateEmail ] = useState( "" )
    const [ createPassword, SetCreatePassword ] = useState( "" )
    const [ createPhone, SetCreatePhone ] = useState( "" )
    const [ createFailed, setCreateFailed ] = useState( false )
    const names = localStorage.getItem( 'names' )
    const email = localStorage.getItem( 'email' )
    const token = localStorage.getItem( 'token' )
    const basketProducts = useSelector( state => state.basketProducts )
    const [ basketPrice, setBasketPrice ] = useState( 0 )
    const [ purchaseState, setPurchaseState ] = useState( false )
    let savedStreet = token ? localStorage.getItem( 'street' ) : '';
    let savedColony = token ? localStorage.getItem( 'colony' ) : '';
    let savedZipCode = token ? localStorage.getItem( 'zipCode' ) : '';
    let savedCity = token ? localStorage.getItem( 'city' ) : '';
    let savedReferences = token ? localStorage.getItem( 'references' ) : '';
    const [ street, setStreet ] = useState( savedStreet )
    const [ colony, setColony ] = useState( savedColony )
    const [ zipCode, setZipCode ] = useState( savedZipCode )
    const [ city, setCity ] = useState( savedCity )
    const [ references, setReferences ] = useState( savedReferences )
    const [ success, setSuccess ] = useState( false )

    if ( token ) {
        dispatch( setIsLoggedThunk( true ) )
    }

    
    useEffect( (  ) => {
        if ( token ) {
            dispatch( getBasketProductsThunk(  ) )
            if ( basketProducts.length > 0 ) {
                let aux = 0
                for ( let i = 0; i < basketProducts.length; i++ ) {
                    aux = aux + ( parseInt( basketProducts[ i ].price ) * basketProducts[ i ].productsInCart.quantity  )
                }
                setBasketPrice( aux )
            }
        }
    }, [ basketProducts, dispatch, token ] )
    
    const login = ( e ) => {
        e.preventDefault(  )
        const credentials = {
            email: logEmail,
            password: logPassword
        }
        dispatch( loginThunk( credentials ) )
    }

    const createAccount = ( e ) => {
        e.preventDefault(  )
        const credentials = {
            firstName: createFirstName,
            lastName: createLastName,
            email: createEmail,
            password: createPassword,
            phone: createPhone,
            role: 'admin'
        }
        dispatch( createUserThunk( credentials, setCreateAccountState, setLoginState, setCreateFailed ) )
    }

    const purchaseBasket = ( e ) => {
        e.preventDefault(  )
        const aux = {
            street,
            colony,
            zipCode,
            city,
            references
        }
        dispatch( purchaseCartThunk( aux, setSuccess ) )
    }

    const deliveryTime = Math.floor( Math.random( ) * 7 )

    return (
        <nav id='nav-bar'>
            <div className="logo">
                <img 
                    src="/assets/imgs/applelogo.png" 
                    alt="apple logo"
                    onClick={
                        (  ) => {
                            navigate( '/' )
                        }
                    }
                />
            </div>
            <div className='links-desktop'>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( !loginState )
                            setCreateAccountState( false )
                            setBasketState( false )
                        }
                    }
                >
                    <i className="fa-solid fa-user-large"></i>{ isLogged ? ' Log out' : ' Log in' }
                </h4>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( false )
                            setCreateAccountState( false )
                            navigate( '/purchases' )
                            setBasketState( false )
                        }
                    }
                >
                    <i className="fa-solid fa-truck-moving"></i> Purchases
                </h4>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( false )
                            setCreateAccountState( false )
                            setBasketState( !basketState )
                            dispatch( getBasketProductsThunk(  ) )
                        }
                    }
                >
                    <i className="fa-solid fa-basket-shopping"></i> Basket { basketProducts.length > 0 && <span>{ basketProducts.length }</span> }
                </h4>
            </div>
            <div className='more-menu'>
                <i className="fa-solid fa-plus"></i>
            </div>
            <div className='links-mobile'>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( !loginState )
                            setCreateAccountState( false )
                            setBasketState( false )
                        }
                    }
                >
                    <i className="fa-solid fa-user-large"></i>{ isLogged ? ' Log out' : ' Log in' }
                </h4>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( false )
                            setCreateAccountState( false )
                            navigate( '/purchases' )
                            setBasketState( false )
                        }
                    }
                >
                    <i className="fa-solid fa-truck-moving"></i> Purchases
                </h4>
                <h4
                    onClick={
                        (  ) => {
                            setLoginState( false )
                            setCreateAccountState( false )
                            setBasketState( !basketState )
                            dispatch( getBasketProductsThunk(  ) )
                        }
                    }
                >
                    <i className="fa-solid fa-basket-shopping"></i> Basket { basketProducts.length > 0 && <span>{ basketProducts.length }</span> }
                </h4>
            </div>
            <div className={ loginState ? 'login-modal open' : 'login-modal' }>
                {
                    isLogged ?
                        <>
                            <div className='already-logged'>
                                <div className='user-info'>
                                    <h4>{ names.toUpperCase(  ) }</h4>
                                    <p>{ email }</p>
                                </div>
                                <div
                                    className='log-out'
                                    onClick={
                                        (  ) => {
                                            localStorage.clear(  )
                                            dispatch( setIsLoggedThunk( false ) )
                                            setLoginState( false )
                                            window.location.replace('');
                                        }
                                    }
                                >
                                    <i className="fa-solid fa-power-off"></i>
                                    <h4>Log out</h4>
                                </div>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setLoginState( false )
                                        }
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        </> : 
                            <>
                                <form
                                    onSubmit={
                                        ( e ) => {
                                            login( e )
                                        }
                                    }
                                >
                                    {
                                        doLoginFailed ? 
                                            <>
                                                <h4>Login failed, try again or create a new account</h4>
                                                <button
                                                    type='button'
                                                    onClick={
                                                        (  ) => {
                                                            dispatch( setDoLoginFailedThunk( false ) )
                                                            setLoginState( true )
                                                        }
                                                    }
                                                >
                                                    Try again
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={
                                                        (  ) => {
                                                            dispatch( setDoLoginFailedThunk( false ) )
                                                            setLoginState( false )
                                                            setCreateAccountState( true )
                                                        }
                                                    }
                                                >
                                                    Create an account
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={
                                                        (  ) => {
                                                            dispatch( setDoLoginFailedThunk( false ) )
                                                            setLoginState( false )
                                                        }
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </> : 
                                                <>
                                                    <h4>Log in</h4>
                                                    <input 
                                                        type="email"
                                                        placeholder='E-mail'
                                                        required
                                                        onChange={
                                                            ( e ) => {
                                                                setLogEmail( e.target.value )
                                                            }
                                                        }
                                                        value={ logEmail }
                                                    />
                                                    <input 
                                                        type="password"
                                                        placeholder='Password'
                                                        required
                                                        onChange={
                                                            ( e ) => {
                                                                setLogPassword( e.target.value )
                                                            }
                                                        }
                                                        value={ logPassword }
                                                    />
                                                    <button
                                                        type='submit'
                                                    >
                                                        Log In
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={
                                                            (  ) => {
                                                                setCreateAccountState( true )
                                                            }
                                                        }
                                                    >
                                                        Create an account
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={
                                                            (  ) => {
                                                                dispatch( setDoLoginFailedThunk( false ) )
                                                                setLoginState( false )
                                                            }
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <p>You can create an account, it totally works!</p>
                                                </>
                                    }
                                </form>
                            </>
                }
            </div>
            <div className={ createAccountState ? 'create-account-modal open' : 'create-account-modal' }>
                <form
                    onSubmit={ ( e ) => {
                        createAccount( e )
                    } }
                >
                    {
                        createFailed ?
                            <> 
                                <h4>Creating account failed! This account probably already exists, please try again or log in</h4>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setCreateFailed( false )
                                            setCreateAccountState( true )
                                        }
                                    }
                                >
                                    Try again
                                </button>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setCreateFailed( false )
                                            setCreateAccountState( false )
                                            setLoginState( true )
                                        }
                                    }
                                >
                                    Log in
                                </button>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setCreateFailed( false )
                                            setCreateAccountState( false )
                                            setLoginState( false )
                                        }
                                    }
                                >
                                    Cancel
                                </button>
                            </> :
                                <>
                                    <h4>Create an account</h4>
                                    <input 
                                        type="text"
                                        placeholder='First name'
                                        required
                                        onChange={ ( e ) => {
                                            SetCreateFirstName( e.target.value )
                                        } }
                                        value={ createFirstName }
                                    />
                                    <input 
                                        type="text"
                                        placeholder='Last name'
                                        required
                                        onChange={ ( e ) => {
                                            SetCreateLastName( e.target.value )
                                        } }
                                        value={ createLastName }
                                    />
                                    <input 
                                        type="email"
                                        placeholder='E-mail'
                                        required
                                        onChange={ ( e ) => {
                                            SetCreateEmail( e.target.value )
                                        } }
                                        value={ createEmail }
                                    />
                                    <input 
                                        type="password"
                                        placeholder='Password (Min 8 characters)'
                                        required
                                        minLength='8'
                                        onChange={ ( e ) => {
                                            SetCreatePassword( e.target.value )
                                        } }
                                        value={ createPassword }
                                    />
                                    <input 
                                        type="number"
                                        placeholder='Phone number (10 digits)'
                                        minLength='10'
                                        maxLength='10'
                                        required
                                        onChange={ ( e ) => {
                                            SetCreatePhone( e.target.value )
                                        } }
                                        value={ createPhone }
                                    />
                                    <button
                                        type='submit'
                                    >
                                        Create
                                    </button>
                                    <button
                                        type='button'
                                        onClick={
                                            (  ) => {
                                                dispatch( setDoLoginFailedThunk( false ) )
                                                setCreateAccountState( false )
                                            }
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <p>Please, don't use real phone numbers or paswords!</p>
                                </>
                    }
                </form>
            </div>
            <div className={ basketState ? 'basket-modal open' : 'basket-modal' }>
                <h4>Basket</h4>
                {
                    token ?
                        <>
                            {
                                basketProducts.length === 0 ?
                                    <>
                                        <h4>You haven't added any products to your basket yet</h4>
                                        <button
                                            type='button'
                                            onClick={
                                                (  ) => {
                                                    setBasketState( false )
                                                }
                                            }
                                        >
                                            Close
                                        </button>
                                    </> :
                                        <>
                                            <ul className='basket-list'>
                                                {
                                                    basketProducts.map( ( product ) => (
                                                        <li key={ product.id }>
                                                            <h4
                                                                onClick={
                                                                    (  ) => {
                                                                        navigate( `/shop/${ product.id }` )
                                                                        setBasketState( false )
                                                                    }
                                                                }
                                                            >
                                                                { product.title }
                                                            </h4>
                                                            <p><b>Price per unit: </b>{ `$${product.price}` }</p>
                                                            <p><b>Units: </b>{ product.productsInCart.quantity }</p>
                                                            <p><b>Total price: </b>{ `$${( product.price * product.productsInCart.quantity )}` }</p>
                                                            <span
                                                                onClick={ (  ) => {
                                                                    dispatch( deleteProductFromBasketThunk( product.id ) )
                                                                } }
                                                            >
                                                                <b>REMOVE PRODUCT</b>
                                                            </span>
                                                        </li>
                                                    ) )
                                                }
                                            </ul>
                                            <h4>Total: {`$${ basketPrice }`}</h4>
                                            <button
                                                    type='button'
                                                    onClick={
                                                        (  ) => {
                                                            setPurchaseState( true )
                                                        }
                                                    }
                                                >
                                                    Buy now
                                            </button>
                                            <button
                                                    type='button'
                                                    onClick={
                                                        (  ) => {
                                                            setBasketState( false )
                                                        }
                                                    }
                                                >
                                                    Close
                                            </button>
                                        </>
                            }
                        </> :
                            <>
                                <h4>You need to log in to see your basket!</h4>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setBasketState( false )
                                            setLoginState( true )
                                        }
                                    }
                                >
                                    Log in
                                </button>
                                <button
                                    type='button'
                                    onClick={
                                        (  ) => {
                                            setBasketState( false )
                                        }
                                    }
                                >
                                    Close
                                </button>
                            </>
                }
            </div>
            <div
                className={ purchaseState ? 'purchase-modal open' : 'purchase-modal' }
            >
                {
                    ( success === false ) ?
                        <>
                            <form
                                onSubmit={ ( e ) => {
                                    purchaseBasket( e )
                                } }
                            >
                                <h4>Purchase</h4>
                                <h5>Total: {`$${basketPrice}`}</h5>
                                <input 
                                    type="text"
                                    placeholder='Street'
                                    onChange={ ( e ) => {
                                        setStreet( e.target.value )
                                        if ( token ) {
                                            localStorage.setItem( 'street', e.target.value )
                                        }
                                    } }
                                    value={ street }
                                    required
                                />
                                <input 
                                    type="text"
                                    placeholder='Colony'
                                    onChange={ ( e ) => {
                                        setColony( e.target.value )
                                        if ( token ) {
                                            localStorage.setItem( 'colony', e.target.value )
                                        }
                                    } }
                                    value={ colony }
                                    required
                                />
                                <input 
                                    type="text"
                                    placeholder='Zip Code'
                                    onChange={ ( e ) => {
                                        setZipCode( e.target.value )
                                        if ( token ) {
                                            localStorage.setItem( 'zipCode', e.target.value )
                                        }
                                    } }
                                    value={ zipCode }
                                    required
                                />
                                <input 
                                    type="text"
                                    placeholder='City'
                                    onChange={ ( e ) => {
                                        setCity( e.target.value )
                                        if ( token ) {
                                            localStorage.setItem( 'city', e.target.value )
                                        }
                                    } }
                                    value={ city }
                                    required
                                />
                                <input 
                                    type="text"
                                    placeholder='References'
                                    onChange={ ( e ) => {
                                        setReferences( e.target.value )
                                        if ( token ) {
                                            localStorage.setItem( 'references', e.target.value )
                                        }
                                    } }
                                    value={ references }
                                    required
                                />
                                <button
                                    type='submit'

                                >
                                    Purchase
                                </button>
                                <button
                                    type='button'
                                    onClick={ (  ) => {
                                        setPurchaseState( false )
                                    } }
                                >
                                    Cancel
                                </button>
                            </form>
                        </> :
                            <>
                                <form>
                                    <h4>Purchase done succesfully!</h4>
                                    <p>
                                        <b>Sent to: </b>{ names }<br />
                                        <b>Address: </b>{ street }, { colony }, { city } { zipCode }<br />
                                        <b>Delivery Time: </b>{ ( deliveryTime === 0 ) ? 7 : deliveryTime } days.<br />
                                        <br />
                                        Thanks for have used my e-commerce simulation, this is a proyect developed by Roberto Rodríguez.<br />
                                        You can continue using this application, your name as well as your address will be remembered on your device.<br />
                                        <br />
                                        Payment method coming soon... $$$
                                    </p>
                                    <button
                                        type='button'
                                        onClick={ (  ) => {
                                            setPurchaseState( false )
                                            setBasketState( false )
                                            setSuccess( false )
                                            window.location.replace('');
                                        } }
                                    >
                                        Close
                                    </button>
                                </form>
                            </>
                }
            </div>
        </nav>
    );
};

export default Nav;