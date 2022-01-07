import { ADD_TO_CART, DELETE_CART, REMOVE_FROM_CART } from "./constants"

export const addToCart = (cartItem) => dispatch => {
    console.log("action: ",cartItem)
    dispatch({
        type:ADD_TO_CART,
        payload:cartItem
    })
}

export const removeFromCart = (cartItem) => dispatch => {
    dispatch({
        type:REMOVE_FROM_CART,
        payload:cartItem
    })
}

export const deleteCart = () => dispatch => {
    dispatch({
        type:DELETE_CART
    })
}