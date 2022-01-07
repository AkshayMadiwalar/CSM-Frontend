import axios from 'axios'
import { Navigate } from 'react-router'
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_ALERT, USER_LOADED } from './constants'
import {useNavigate} from 'react-router-dom'
import setAuthToken from '../utils/setAuthToken'
import ShowAlert from '../components/alerts/ShowAlert'
import { setAlert } from './alert'
import ApiConstants from './../ApiConstants'

export const registerUser = ({firstName,lastName,email,password,city,country}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({firstName,lastName,email,password,city,country})
    try {
        const res = await axios.post(ApiConstants.Service.identity+'users/register',body,config)
        localStorage.setItem('isBusinessAccount',"false")
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Registered','success'))
    } catch (error) {
        console.log(error)
        dispatch(setAlert('Sorry! Try again','danger'))
    }
}

export const loginUser = ({email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    try {
        const res = await axios.post(ApiConstants.Service.identity+'/auth/login',{email,password},config)
        console.log(res)
        localStorage.setItem('isBusinessAccount',"false")
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
       dispatch(loadUser())
       dispatch(setAlert('Logged In','success'))
    } catch (error) {
        dispatch(setAlert('Sorry! Try again','danger'))
    }
}

export const registerBusiness = ({ firstName, lastName, email, password, businessName,
    businessCategory, addressLine1, addressLine2, city, country, contactNo }) => async dispatch => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ firstName, lastName, email, password, businessName,
            businessCategory, addressLine1, addressLine2, city, country, contactNo })
        
        try {
            const res = await axios.post(ApiConstants.Service.identity+'/users/register-business',body,config)
            localStorage.setItem('isBusinessAccount',"true")
            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
            dispatch(setAlert('Registered','success'))
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL
            })
            dispatch({
                type:AUTH_ERROR
            })
            dispatch(setAlert('Sorry! Try again','danger'))
        }
}

export const loginBusinessAccount = (formData,res) => async dispatch => {
    const {email, password} = formData
    try {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(ApiConstants.Service.identity+'/auth/login-business',{email,password},config)
        localStorage.setItem('isBusinessAccount',"true")
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type:AUTH_ERROR
        })
        dispatch(setAlert('Sorry! Try again','danger'))
    }
}

export const logout = (req,res) => dispatch => {
    localStorage.setItem('isBusinessAccount',"false")
    dispatch({
        type:LOGOUT
    })
    dispatch(setAlert('Logged Out','success'))
}

export const loadUser = (req,res) => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    console.log("-----------------LOAD")
    console.log(localStorage.getItem('isBusinessAccount'))
    try {
        if(localStorage.getItem('isBusinessAccount')==="true"){
            console.log("-------------BUSINESS")
            const res = await axios.get(ApiConstants.Service.identity+'/auth/business-auth')
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        }
        if(localStorage.getItem('isBusinessAccount')==="false"){
            const res = await axios.get(ApiConstants.Service.identity+'/auth/user-auth')
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        }

    } catch (error) {
        console.log("Auth failed")
        dispatch({
            type:AUTH_ERROR
        })
        dispatch(setAlert('Failed to load your session','danger'))
    }

}