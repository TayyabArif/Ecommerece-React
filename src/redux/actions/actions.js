import { actionTypes } from "../constants/action-type";


export const signup = (data) => {
    return async function (dispatch) {
        try {
            dispatch({ type: actionTypes.ISSIGNUP });
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
                method: 'POST',
                body: (data)
            });
            const result = await response.json()
            if (response.status >= 200 && response.status < 400) {
                localStorage.setItem('register', 'created')
                dispatch({ type: actionTypes.SIGNUP, payload: result })
            }
            else dispatch({ type: actionTypes.SIGNUPERR })
        } catch (err) { alert("Our server is not respnoded please Wait!") }
    }
}
export const login = (data) => {
    return async function (dispatch) {
        try {
            dispatch({ type: actionTypes.LOADING });
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/sign_in`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: (data)
            });
            const result = await response.json()
            if (response.status >= 200 && response.status < 400) {
                localStorage.setItem('user', result.name)
                localStorage.setItem('image', result.avatar_url)
                const token = response.headers.get('Authorization')
                dispatch({ type: actionTypes.LOGIN, payload: result, token: token })
            }
            else {
                dispatch({ type: actionTypes.LOGINERR })
            }
        } catch (err) { alert("Our server is not respnoded please Wait!") }
    }
}
export const logout = () => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/sign_out`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                }
            });
            dispatch({ type: actionTypes.LOGOUT })
        } catch (err) { console.log('error') }
    }
}
export const categoryItems = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: actionTypes.LOADING });
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.CATEGORIES, payload: result })
            }
            else {
                console.log('Your categories are not fetched')
                dispatch({ type: actionTypes.CATEGORIESERR })
            }
        } catch (err) { alert("Our server is not respnoded please Wait!") }

    }
}

export const addProduct = (data) => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `${tokenData}`
                },
                body: (data)
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.ADDPRODUCT, payload: result })
            }
            else {
                console.log('You are not authorized or Request failed')
                dispatch({ type: actionTypes.ADDPRODUCTERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}

export const allProductItems = () => {
    return async function (dispatch) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.ALLPRODUCTS, payload: result })
            }
            else {
                console.log('Your products are not fetched')
                dispatch({ type: actionTypes.ALLPRODUCTSERR })
            }
        } catch (err) {
            console.log('products is not passed properly ')
        }

    }
}
export const product = (id) => {
    const myId = id.id
    return async function (dispatch) {
        dispatch({ type: actionTypes.LOADING });
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${myId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.PRODUCT, payload: result })
            }
            else {
                console.log('Your product is not fetched')
                dispatch({ type: actionTypes.PRODUCTERR })
            }
        } catch (err) {
            console.log('product is not passed properly ')
        }

    }
}
export const comment = (data) => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                },
                body: (data)
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.COMMENT, payload: result })
            }
            else {
                console.log('You are not authorized')
                dispatch({ type: actionTypes.COMMENTERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}

export const deleteMyComment = (data) => {
    return async function (dispatch) {
        dispatch({ type: actionTypes.LOADING });
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comments/${data}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                console.log('comment is delete')
            }
            else {
                console.log('You are not authorized')
            }
        } catch (err) {
            alert('comment is delete')
            console.log('Data is not passed properly ')
        }

    }
}


export const order = (data) => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                },
                body: (data)
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.ORDER, payload: result })
            }
            else {
                console.log('ORDER IS NOT CREATED')
                dispatch({ type: actionTypes.ORDERERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}
export const lineItem = (data) => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/line_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                },
                body: (data)
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.LINEITEM, payload: result })
            }
            else {
                console.log('line item IS NOT CREATED')
                dispatch({ type: actionTypes.LINEITEMERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}


export const myItems = () => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/line_items`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                }
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.GETITEM, payload: result })
            }
            else {
                console.log('line item IS NOT GET')
                dispatch({ type: actionTypes.GETITEMERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}

export const getMyProducts = () => {
    return async function (dispatch) {
        const tokenData = localStorage.getItem('token')
        try {
            dispatch({ type: actionTypes.LOADING });
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${tokenData}`
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.MYPRODUCTS, payload: result })
            }
            else {
                console.log('Your categories are not fetched')
                dispatch({ type: actionTypes.MYPRODUCTSERR })
            }
        } catch (err) { alert("Our server is not respnoded please Wait!") }

    }
}

export const getMyComments = (data, page) => {
    return async function (dispatch) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/product/${data}/comments/${page}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.PRODUCTCOMMENTS, payload: result })
            }
            else {
                console.log('Your categories are not fetched')
                dispatch({ type: actionTypes.PRODUCTCOMMENTSERR })
            }
        } catch (err) { alert("your url is wrong") }

    }
}

export const getAllProducts = (data, page) => {
    return async function (dispatch) {
        try {
            dispatch({ type: actionTypes.LOADING });
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/product/${data}/${page}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            const result = await response.json()
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.GETALLPRODUCTS, payload: result })
            }
            else {
                console.log('Your products are not fetched')
                dispatch({ type: actionTypes.GETALLPRODUCTSERR })
            }
        } catch (err) { alert("your url is wrong") }

    }
}

export const oauthUser = (data) => {
    return async function (dispatch) {
        try {
            console.log("data@@@@@@@@@@@@@@@@@@@", data)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/profiles/google_sign_in`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: (data)
            });
            const result = await response.json()
            console.log("result!!!!!!!!!!!!!!!!!!!!!!!!!", result)
            if (response.status < 400 && response.status >= 200) {
                dispatch({ type: actionTypes.ORDER, payload: result })
            }
            else {
                console.log('ORDER IS NOT CREATED')
                dispatch({ type: actionTypes.ORDERERR })
            }
        } catch (err) {
            console.log('Data is not passed properly ')
        }

    }
}


