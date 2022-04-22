import { actions } from "./actions";

const INITIAL_STATE = {
    isLoading: false,
    products: [  ],
    categories: [  ],
    productOnFocus: {  },
    isLogged: false,
    doLoginFailed: false,
    token: '',
    basketProducts: [  ],
    purchases: [  ]
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
        
        case actions.setIsLoading:
            return {
                ...state,
                isLoading: action.payload
            }

        case actions.setProducts:
            return {
                ...state,
                products: action.payload
            }

        case actions.setCategories:
            return {
                ...state,
                categories: action.payload
            }

        case actions.setProductOnFocus:
            return {
                ...state,
                productOnFocus: action.payload
            }

        case actions.setIsLogged:
            return {
                ...state,
                isLogged: action.payload
            }

        case actions.setDoLoginFailed:
            return {
                ...state,
                doLoginFailed: action.payload
            }

        case actions.setToken:
            return {
                ...state,
                token: action.payload
            }

        case actions.getBasketProducts:
            return {
                ...state,
                basketProducts: action.payload
            }

        case actions.getPurchases:
            return {
                ...state,
                purchases: action.payload
            }

        default:
            return state;
    }
}

export default reducer;