import { actionTypes } from "../constants/action-type";

const initialState = {
    user: {},
    users: {},
    isLogin: false,
    loading: true,
    getLogin: true,
    signup: false,
    categories: [],
    myProducts: [],
    myComments: [],
    allProduct: [],
    orderLoaded: false,
    items: false,
    addSuccess: false,
    products: [],
    product: {},
    item: [],
    comment: {},
    order: {}

}
export const userReducer = (state = initialState, { type, payload, token }) => {
    switch (type) {
        case actionTypes.LOADING:
            return {
                ...state, loading: true
            };
        case actionTypes.LOGIN:
            localStorage.removeItem('token')
            localStorage.setItem('token', token)
            return {
                ...state,
                user: payload,
                loading: false,
                isLogin: true,
                getLogin: false
            };
        case actionTypes.LOGOUT:
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("image")
            window.location.reload(false)
            return {
                user: {
                    loading: false,
                    ...state,
                }
            };
        case actionTypes.LOGINERR:
            return {
                isLogin: false,
                loading: true,
                getLogin: false
            }
        default:
            return { ...state }
    }
}
export const registerUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ISSIGNUP:
            return {
                signup: false, loading: false
            };
        case actionTypes.SIGNUP:
            return {
                ...state, users: payload,
                loading: false,
                signup: true
            };
        case actionTypes.SIGNUPERR:
            return {
                users: { ...state },
                signup: true,
                loading: true,
            }
        default:
            return { ...state }
    }
}
export const categoriesItem = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CATEGORIES:
            return {
                ...state, categories: payload, loading: false, items: true
            };
        case actionTypes.CATEGORIESERR:
            return {
                ...state,
                loading: false,
                item: false
            }
        default:
            return { ...state }
    }
}
export const allProducts = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ALLPRODUCTS:
            return {
                ...state, products: payload, loading: false
            };
        case actionTypes.ALLPRODUCTSERR:
            return {
                ...state, loading: false
            }
        default:
            return { ...state }
    }
}
export const products = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.PRODUCT:
            return {
                ...state, product: payload, loading: false
            };
        case actionTypes.PRODUCTERR:
            return {
                ...state, loading: false
            }
        default:
            return { ...state }
    }
}
export const myComment = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.COMMENT:
            return {
                ...state,
                comment: payload,
                items: true
            };
        case actionTypes.COMMENTERR:
            return {
                ...state
            }
        default:
            return { ...state }
    }
}
export const myOrder = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ORDER:
            return {
                ...state, order: payload, orderLoaded: true
            };
        case actionTypes.ORDERERR:
            console.log("ORDER is not loaded")
            return {
                ...state
            }
        default:
            return { ...state }
    }
}
export const myItem = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.LOADING:
            return {
                loading: true
            };
        case actionTypes.GETITEM:
            return {
                ...state, item: payload,
                loading: false,
                addSuccess: true
            };
        case actionTypes.GETITEMERR:
            console.log("item is not loaded")
            return {
                ...state
            }
        default:
            return { ...state }
    }
}
export const myAllProducts = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.MYPRODUCTS:
            return {
                ...state, myProducts: payload, loading: false, items: true
            };
        case actionTypes.MYPRODUCTSERR:
            return {
                ...state,
                loading: false,
                item: false
            }
        default:
            return { ...state }
    }
}
export const productComments = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.PRODUCTCOMMENTS:
            return {
                ...state, myComments: payload, loading: false
            };
        case actionTypes.PRODUCTCOMMENTSERR:
            return {
                ...state,
                loading: false,
                item: false
            }
        default:
            return { ...state }
    }
}
export const getAllProducts = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GETALLPRODUCTS:
            return {
                ...state, allProduct: payload, loading: false, items: true
            };
        case actionTypes.GETALLPRODUCTSERR:
            return {
                ...state,
                loading: false,
                item: false
            }
        default:
            return { ...state }
    }
}