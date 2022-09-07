import { combineReducers } from "redux";
import { allProducts, categoriesItem,getAllProducts, myAllProducts, myComment, myItem, myOrder, productComments, products, registerUserReducer, userReducer } from "./reducer";

export const reducers= combineReducers(
    {
        registerUserReducer: registerUserReducer,
        userReducer: userReducer,
        categoriesItem: categoriesItem,
        allProducts: allProducts,
        products: products,
        myComment: myComment,
        myOrder: myOrder,
        myItem: myItem,
        myAllProducts: myAllProducts,
        productComments: productComments,
        getAllProducts: getAllProducts

})