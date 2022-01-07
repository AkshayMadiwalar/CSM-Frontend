import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, auth, ...rest}) => {

    console.log("auth----------------------",auth)
    if(auth){
        if(!auth.isAuthenticated && !auth.loading){
            return <Navigate to="/home"/>
        }
        return <Outlet/>
    }

    
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps,{})(PrivateRoute)
