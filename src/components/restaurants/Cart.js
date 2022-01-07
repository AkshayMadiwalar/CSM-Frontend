import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import './Cart.css'
import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import { deleteCart } from '../../actions/cart'
import { setAlert } from '../../actions/alert'
import ApiConstants from './../../ApiConstants'

const Cart = props => {

    if (props.cart === null) {
        return <Navigate to="/restaurants" />
    }

    if (props.cart.length === 0) {
        return <Navigate to="/restaurants" />
    }

    const sendOrder = async () => {
        console.log(props.cart)
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const payload = {
            customer:props.auth.user.id,
            cart: props.cart
        }
      
        const res = await axios.post(ApiConstants.Service.identity+'/cart/placeorder',payload,config)
        if(res.status === 200){
                props.setAlert('Order Placed','success')
                props.deleteCart()

        }
    }


    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Cart</h4>
                        
                    </div>

                    {props.cart && props.cart.length > 0 && props.cart.map(item => (
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1"><img className="rounded" src={item.img} width="70" /></div>
                            <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{item.name}</span>
                                {/* <div className="d-flex flex-row product-desc">
                                    <div className="size mr-1"><span className="text-grey">Size:</span><span className="font-weight-bold">&nbsp;M</span></div>
                                    <div className="color"><span className="text-grey">Color:</span><span className="font-weight-bold">&nbsp;Grey</span></div>
                                </div> */}
                            </div>
                            <div className="d-flex flex-row align-items-center qty"><i className="fa fa-minus text-danger"></i>
                                <h5 className="text-grey mt-1 mr-1 ml-1">1</h5><i className="fa fa-plus text-success"></i>
                            </div>
                            <div>
                                <h5 className="text-grey">${item.price}</h5>
                            </div>
                            <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger"></i></div>
                        </div>
                    ))}


                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="text" className="form-control border-0 gift-card" placeholder="discount code/gift card" /><button className="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button></div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" onClick={()=>sendOrder()} type="button">Proceed to Pay</button></div>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {

}

const mapStateToProps = state => ({
    cart: state.cart,
    auth: state.auth
})

export default connect(mapStateToProps, {deleteCart,setAlert})(Cart)
