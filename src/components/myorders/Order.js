import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ApiConstants from './../../ApiConstants'
import { Card, Button, Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'

const Order = props => {

  const [restaurant, setRestaurant] = useState({})


  useEffect(async () => {
    const restaurantId = props.orderItem.restaurant_id
    const res = await axios.get(ApiConstants.Service.identity + `/poi/resto/${restaurantId}`)
    setRestaurant(res.data[0])
  }, [])


  return (
    <Card>
      <Card.Header>{restaurant.resto_name} {'      '}|{'      '} {restaurant.city}</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Row>

       
        <Col sm={6}>
        {props.orderItem.menu_items.split('%&&&%').map(item => (
            < Card.Text >
              < Row >           
                <Col>
                    <img className="rounded" src={ item.split('##')[2]} width="70" />
                  </Col>
                  <Col>
                    <span class="font-weight-bold">{item.split('##')[0]}</span><br/>
                    <span>$ {' '} {item.split('##')[1]}</span>
                  </Col>
              </Row>
            </Card.Text>
        ))}
        </Col>

        <Col sm={1}>
            <div  style={{borderLeft:'6px solid #ffbe33',height:100}}>

            </div>
        </Col>

        <Col>
            <span > Delivered on <Moment format="MM/DD/YYYY"  class="font-weight-bold">{props.orderItem.date}</Moment></span>
            <br/>
            <br/>
            <span  class="font-weight-bold"> Total Paid: $ {props.orderItem.price}</span>
        </Col>

        </Row>



        <Button className="rounded-pill"  style={{ backgroundColor: '#ffbe33'}}>ReOrder</Button>
      </Card.Body >
    </Card >
  )
}

Order.propTypes = {

}

export default Order
