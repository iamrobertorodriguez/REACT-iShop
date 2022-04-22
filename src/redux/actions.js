import axios from "axios"

export const actions = {
    setIsLoading: 'SET_IS_LOADING',
    setProducts: 'SET_PRODUCTS',
    setCategories: 'SET_CATEGORIES',
    setProductOnFocus: 'SET_PRODUCT_ON_FOCUS',
    setIsLogged: 'SET_IS_LOGGED',
    setDoLoginFailed: 'SET_DO_LOGIN_FAILED',
    setToken: 'SET_TOKEN',
    getBasketProducts: 'GET_BASKET_PRODUCTS',
    getPurchases: 'GET_PURCHASES'
}

const getConfig = (  ) => ({
    headers: { Authorization: `Bearer ${ localStorage.getItem( 'token' ) }` }
})

export const setIsLoading = ( isLoading ) => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setProducts = ( products ) => ({
    type: actions.setProducts,
    payload: products
})

export const setCategories = ( categories ) => ({
    type: actions.setCategories,
    payload: categories
})

export const setProductOnFocus = ( productOnFocus ) => ({
    type: actions.setProductOnFocus,
    payload: productOnFocus
})

export const setIsLogged = ( state ) => ({
    type: actions.setIsLogged,
    payload: state
})

export const setDoLoginFailed = ( state ) => ({
    type: actions.setDoLoginFailed,
    payload: state
})

export const setToken = ( token ) => ({
    type: actions.setToken,
    payload: token
})

export const getBasketProducts = ( products ) => ({
    type: actions.getBasketProducts,
    payload: products
})

export const getPurchases = ( products ) => ({
    type: actions.getPurchases,
    payload: products
})

export const getProductsThunk = (  ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .get( 'https://ecommerce-api-react.herokuapp.com/api/v1/products' )
            .then( ( res ) => {
                dispatch( setProducts( res.data.data.products ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const getCategoriesThunk = (  ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .get( 'https://ecommerce-api-react.herokuapp.com/api/v1/products/categories' )
            .then( ( res ) => {
                dispatch( setCategories( res.data.data.categories ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const filterCategoryThunk = ( id ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .get( `https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${ id }` )
            .then( ( res ) => {
                dispatch( setProducts( res.data.data.products ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const submitQueryThunk = ( query ) => {
    return dispatch => {
        return axios
            .get( `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${ query }` )
            .then( ( res ) => {
                dispatch( setProducts( res.data.data.products ) )
            } )
    }
}

export const getProductOnFocusThunk = ( id ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .get( `https://ecommerce-api-react.herokuapp.com/api/v1/products/${ id }` )
            .then( ( res ) => {
                dispatch( setProductOnFocus( res.data.data.product ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const setIsLoggedThunk = ( state ) => {
    return dispatch => {
        dispatch( setIsLogged( state ) )
    }
}

export const setDoLoginFailedThunk = ( state ) => {
    return dispatch => {
        dispatch( setDoLoginFailed( state ) )
    }
}

export const setTokenThunk = ( token ) => {
    return dispatch => {
        dispatch( setToken( token ) )
    }
}

export const loginThunk = ( credentials ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .post( 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials )
            .then( ( res ) => {
                dispatch( setDoLoginFailedThunk( false ) )
                dispatch( setIsLoggedThunk( true ) )
                localStorage.setItem( 'names', `${res.data.data.user.firstName} ${res.data.data.user.lastName}` )
                localStorage.setItem( 'email', res.data.data.user.email )
                localStorage.setItem( 'token', res.data.data.token )
            } )
            .catch( ( error ) => {
                dispatch( setDoLoginFailedThunk( true ) )
                dispatch( setIsLoggedThunk( false ) )
                console.log( error )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const createUserThunk = ( user, create, login, fail ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .post( 'https://ecommerce-api-react.herokuapp.com/api/v1/users', user )
            .then( (  ) => {
                create( false )
                login( true )
                fail( false )
            } )
            .catch( (  ) => {
                fail( true )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const getBasketProductsThunk = (  ) => {
    return dispatch => {
        return axios
            .get( 'https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig(  ) )
            .then( ( res ) => {
                dispatch( getBasketProducts( res.data.data.cart.products ) )
            } )
    }
}

export const addProductToBasketThunk = ( product ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .post( 'https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig(  ) )
            .then( (  ) => {
                dispatch( getBasketProductsThunk(  ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const deleteProductFromBasketThunk = ( id ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .delete( `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${ id }`, getConfig(  ) )
            .then( (  ) => {
                dispatch( getBasketProductsThunk(  ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const getPurchasesThunk = (  ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .get( 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig(  ) )
            .then( ( res ) => {
                dispatch( getPurchases( res.data.data.purchases ) )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}

export const purchaseCartThunk = ( details, success ) => {
    return dispatch => {
        dispatch( setIsLoading( true ) )
        return axios
            .post( 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases', details, getConfig(  ) )
            .then( (  ) => {
                getBasketProductsThunk(  )
                success( true )
            } )
            .finally( (  ) => {
                dispatch( setIsLoading( false ) )
            } )
    }
}