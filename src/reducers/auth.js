import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, LOGOUT } from "../actions/constants";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user:null,
    loading:true
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading:false
            }
        case USER_LOADED:
            return {
                ...state,
                user:payload,
                isAuthenticated:true,
                loading:false
            }
        case AUTH_ERROR:
            return {
                ...state,
                user:null,
                isAuthenticated: false,
                loading:false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading:false
            }

        default:
            return state
    }
}