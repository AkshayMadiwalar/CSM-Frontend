import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import {connect} from 'react-redux'
import { Navigate } from 'react-router'
import { loginBusinessAccount } from '../../actions/auth'

const LoginBusiness = props => {

   const [formData, setFormData] = useState({
       email:"",
       password:""
   })

   const {email,password} = formData

   const onChangeData = (e) =>{
       setFormData({...formData,[e.target.name]:e.target.value})
   }

   const onSubmitData = (e) => {
       e.preventDefault()
       console.log(formData)
       props.loginBusinessAccount(formData)
   }

   console.log(props.auth.isAuthenticated)
    if(props.auth.isAuthenticated){
        return <Navigate to="/business"/>
    }
    return (
        <Row style={{marginTop:40}}>
            <Col sm={4}>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header>Login to your Business Account</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" value={email} placeholder="Enter email" onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={(e)=>{onChangeData(e)}}/>
                                </Form.Group>

                            </Form>
                        </Card.Text>
                        <Button className="rounded-pill" onClick={(e)=>onSubmitData(e)} style={{backgroundColor:'#ffbe33', float:'right'}}>Submit</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
            </Col>
        </Row>

    )
}

LoginBusiness.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{loginBusinessAccount})(LoginBusiness)
