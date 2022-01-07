import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Container,Row,Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth'

const Signup = props => {
    const [formData,setFormData] = useState({
        firstName: "",
        lastName:"",
        email:"",
        password:"",
        city: "",
        country: ""
    })

    const {firstName,lastName,email,password,city,country} = formData

    const onChangeData = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmitData = (e) => {
        e.preventDefault()
        props.registerUser(formData)
    }
    return (
        <Fragment>
            <Container>
                <Row></Row><p></p><p></p>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="firstName" value={firstName} placeholder="First Name" onChange={(e)=>{onChangeData(e)}} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="lastName" value={lastName} placeholder="Last Name" onChange={(e)=>{onChangeData(e)}}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="email" name="email" value={email} placeholder="Email" onChange={(e)=>{onChangeData(e)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={(e)=>{onChangeData(e)}}/>
                            </Form.Group>

                            
                            <Form.Group className="mb-3" >
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="city" value={city} placeholder="City" onChange={(e)=>{onChangeData(e)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="country" value={country} placeholder="Country" onChange={(e)=>{onChangeData(e)}}/>
                            </Form.Group>


                            <Button style={{backgroundColor:"#ffbe33"}} className="rounded-pill" onClick={(e)=>{onSubmitData(e)}} type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

        </Fragment>
    )
}

Signup.propTypes = {

}

export default connect(null,{registerUser})(Signup)
