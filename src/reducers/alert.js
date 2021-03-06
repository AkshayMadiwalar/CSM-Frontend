import { REMOVE_ALERT, SET_ALERT } from "../actions/constants"

const initialState = []

export default function(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return []
        default:
            return state
    }
}