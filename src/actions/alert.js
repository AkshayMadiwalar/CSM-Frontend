import { SET_ALERT,REMOVE_ALERT } from "./constants"

export const setAlert = (message,alertType,timer=5000) => dispatch => {
    dispatch({
        type:SET_ALERT,
        payload:{message,alertType}
    })

    setTimeout(()=>dispatch({type:REMOVE_ALERT}),timer)
}