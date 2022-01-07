import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../../actions/auth'

const Navbar = (props) => {

    let authLinks
    let signup
    if(props.auth){
      if(props.auth.isAuthenticated){
        authLinks = (
          <li className="nav-item">
          <a className="nav-link" onClick={()=>{props.logout()}}>Logout <span className="sr-only"></span> </a>
        </li>
        )
      }else{
        authLinks = (
          <li className="nav-item">
          <Link className="nav-link" to="/login">Login <span className="sr-only"></span> </Link>
        </li>
        )
        signup = (
          <Link to="/signup" className="order_online">
          SignUp
        </Link>
        )
      }
    }


    return (
        <header className="header_section">
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link className="navbar-brand" to="/home">
                <span>
                  Bistro
                </span>
              </Link>
    
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  mx-auto ">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span> </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">Write a Review</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">Events</a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-business">Bistro for Business</Link>
                  </li>
                </ul>
                <div className="user_option">  

                <ul className="navbar-nav  mx-auto ">
                  {authLinks}
                </ul>
                    {signup}
                </div>
              </div>
            </nav>
          </div>
        </header>
      
    )
}

Navbar.propTypes = {

}

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
