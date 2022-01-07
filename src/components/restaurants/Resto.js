import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import restoImg from './../../images/landing.jpg'
import ReactStars from 'react-rating-stars-component'
import { Row, Col, Badge, Button } from 'react-bootstrap'
import Menu from './Menu'
import Sticky from 'react-sticky-el';
import { Navigate, useParams } from 'react-router'
import axios from 'axios'
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert'
import ApiConstants from './../../ApiConstants'

const Resto = props => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState({})
  const [menu, setMenu] = useState([])
  const [toCart,setToCart] = useState(false);

  useEffect(async () => {
    console.log(params.id)
    const restaurantId = params.id
    const res = await axios.get(ApiConstants.Service.identity+`/poi/resto/${restaurantId}`)
    setRestaurant(res.data[0])

    const resMenu = await axios.get(ApiConstants.Service.identity+`/poi/resto/menu/resto-menu/${res.data[0].id}`)
    setMenu(resMenu.data)
  }, [])

  const proceesToCart = () => {
    console.log(props.cart)
    if(props.cart != null && props.cart.length > 0){
      setToCart(true)
    }else{
        props.setAlert("Sorry! Add items to your cart","danger")
    }
  }

  if(toCart){
    return <Navigate to="/cart"/>
  }
  return (
    <Fragment>

      <section className="about_section layout_padding">
        <div className="container  ">

          <div className="row">
            <div className="col-md-6 ">
              <div className="img-box">
                <img src={restaurant.img_url} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>
                    {restaurant.resto_name}
                  </h2>
                  <br />
                </div>
                <Row>{'   '}
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    className="rating"
                  />
                </Row>
                <Row>
                  <Col sm={3}><i class="fas fa-check-circle"><span style={{ color: 'green' }}>Claimed</span></i></Col>
                  <Col ><span><bold>{restaurant.cuisine}</bold></span></Col>
                </Row>

              </div>
            </div>
          </div>
        </div>
      </section>


      <Row>
        <Col sm={9}>
          <Menu menu={menu} />
        </Col>

        <Col style={{marginTop:30}}>

          <Sticky>
            <div className="btn-box" style={{marginTop:10}}>
              <Button onClick={()=>proceesToCart()} className="rounded-pill" style={{ backgroundColor: "#ffbe33", width:"100%" }}>
                Proceed to Cart
              </Button>
            </div>

          </Sticky>

        </Col>
      </Row>

    </Fragment>
  )
}

Resto.propTypes = {

}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps,{setAlert})(Resto)
