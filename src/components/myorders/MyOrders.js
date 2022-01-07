import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ApiConstants from './../../ApiConstants'
import { connect } from 'react-redux'
import Order from './Order'


const MyOrders = props => {

  const [myOrders, setmyOrders] = useState([])
  let customer;




  useEffect(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      if(props.auth.user!=null){
        const customerId = props.auth.user.id
        const res = await axios.post(ApiConstants.Service.order + '/orders/myOrders', { customerId }, config)
        console.log(res.data)
        setmyOrders(res.data)
      }

    } catch (error) {
      
    }

    
  }, [props.auth.loading])




  return (
    <Fragment>
      <Card style={{ backgroundColor: '#ffbe33' }}>
        <Card.Body>
          <Row>
            <Col sm={9}>
              Akshay Madiwalar{'   '}|{'   '}9538184950{'   '}|{'   '}akshaymadiwalar@gmail.com
            </Col>

            <Col>
              <Link to="/">EDIT PROFILE</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row style={{ margin: 15 }}>
        <Col sm={2}>
        </Col>

        <Col>
          {myOrders && myOrders.length > 0 && myOrders.map(order => (
              <Order orderItem={order}/>
          ))}

        </Col>

        <Col sm={2}>
        </Col>
      </Row>
    </Fragment>
  )
}

MyOrders.propTypes = {

}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(MyOrders)
