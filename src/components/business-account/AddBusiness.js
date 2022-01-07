import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Row, Button, Card } from 'react-bootstrap'
import businesslanding from './../../images/business-landing.jpg'
import Sticky from 'react-sticky-el'
import { useState } from 'react'
import {connect} from 'react-redux'

import { registerBusiness } from '../../actions/auth'
import auth from '../../reducers/auth'
import { Navigate } from 'react-router'
import { NavLink } from 'react-router-dom'

const AddBusiness = props => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNo: "",
        businessName: "",
        businessCategory: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: ""
    })

    const [toggleLogin,setToggleLogin] = useState(false)
    
    const { firstName, lastName, email, password, businessName,
        businessCategory, addressLine1, addressLine2, city, country, contactNo } = formData

    const onChangeData = (e) => {
        console.log(e)
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onChangeFormSelectData = (e) =>{
        console.log(e)
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmitData = (e) => {
        e.preventDefault();
        console.log(formData)
        props.registerBusiness(formData)
    }

    if(props.auth.isAuthenticated){
        console.log("yes");
        return <Navigate to="/business"/>
    }


   

    if(toggleLogin){
        return <Navigate to="/login-business"/>
    }


    return (
        <Row>
            <Col sm={2}>
            </Col>
            <Col sm={5}>
                <Card style={{ marginTop: 30, marginBottom: 0 }}>
                    <Card.Header>Setup your Business Account</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={(e)=>{onChangeData(e)}}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control type="text" name="businessName" placeholder="Your Business Name" value={businessName} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="number" name="contactNo" placeholder="Your Contact number" value={contactNo} onChange={(e)=>{onChangeData(e)}}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your number with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Business Category</Form.Label>{'   '}
                                    <Form.Select size="sm" name="businessCategory" value={businessCategory} onClick={(e)=>{onChangeFormSelectData(e)}}>
                                        <option value="Restaurants">Restaurants</option>
                                        <option value="Food Delivery">Food Delivery</option>
                                        <option value="Hospitals">Hospitals</option>
                                        <option value="Home Service">Home Service</option>
                                        <option value="Dieticians">Dieticians</option>
                                        <option value="IT Servcies">IT Services</option>
                                        <option value="Gym & workouts">Gym & workouts</option>
                                        <option value="Others">Others</option>
                                    </Form.Select >
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="Address Line1" name="addressLine1" value={addressLine1}  onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="Address Line2" name="addressLine2" value={addressLine2} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="City" name="city" value={city} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="Country" name="country" value={country} onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>


                                <Button className="rounded-pill" style={{ backgroundColor: '#ffbe33' }} onClick={(e)=>{onSubmitData(e)}} type="submit">
                                    Add Business
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={3}>
                <Sticky>
                    <img style={{ alignContent: 'center', marginTop: 30, marginRight: 40 }} src={businesslanding} alt="" />
                    <hr />
                    <br />
                    <Card>
                        <Card.Body>Have a Business Account?
                            <Button className="rounded-pill" onClick={(e)=> setToggleLogin(true)} style={{ backgroundColor: '#ffbe33' }}>Login</Button>
                        </Card.Body>
                    </Card>

                </Sticky>
            </Col>
            <Col sm={2}>

            </Col>
        </Row>

    )
}

AddBusiness.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{registerBusiness})(AddBusiness)
