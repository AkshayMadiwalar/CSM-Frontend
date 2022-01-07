import { ADD_TO_CART, REMOVE_FROM_CART, DELETE_CART } from "../actions/constants";

const initialState = []

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case ADD_TO_CART:
            console.log("reduc: ",payload)
            return [...state,payload]
        case REMOVE_FROM_CART:
            const newState = [...state]
            return newState.filter(item=> item.id != payload.id)
        case DELETE_CART:
            return []
        default:
            return state
    }
}