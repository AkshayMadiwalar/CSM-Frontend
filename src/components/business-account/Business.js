import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Card, ListGroup, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import restImg from './../../images/landing.jpg'
import axios from 'axios'
import { connect } from 'react-redux'
import AddMenu from './AddMenu'
import Sticky from 'react-sticky-el'
import ApiConstants from './../../ApiConstants'

const Business = (props) => {

    const [restaurant, setRestaurant] = useState({})
    const [menuItems, setMenuItems] = useState([])

    useEffect(async () => {
        try {
            const res = await axios.get(ApiConstants.Service.identity+`/poi/resto/owner/${props.auth.user.id}`)
            const restData = res.data[0]
            console.log(restData)
            setRestaurant(restData)
        } catch (error) {
            console.log(error)
        }
    }, [props.auth.loading])


    useEffect(async () => {
        try {
            const res = await axios.get(ApiConstants.Service.identity+`/poi/resto/menu/resto-menu/${restaurant.id}`)
            console.log("Menu items-----------------------------",res.data)
            setMenuItems(res.data)
        } catch (error) {
            console.log("Error: ", error)
        }
    }, [restaurant])

    console.log(restaurant)
    const [modalShow, setModalShow] = useState(false)

    return (
        <Row style={{ margin: 20 }}>
            <Col sm={3} >
                <Sticky>
                    <ListGroup>
                        <ListGroup.Item><Link to="/business">Your Restaurant Restaurant</Link></ListGroup.Item>
                        <ListGroup.Item>Orders</ListGroup.Item>
                        <ListGroup.Item>Revenue</ListGroup.Item>
                        <ListGroup.Item><Link to="/add-restaurant">Add new Restaurant</Link></ListGroup.Item>
                        <ListGroup.Item>Account Settings</ListGroup.Item>
                    </ListGroup>
                </Sticky>
            </Col>
            <Col sm={7}>
                {restaurant && (
                <Card style={{ width: '100%' }}>
                <Card.Img variant="top" style={{ height: '18rem' }} src={restaurant.img_url} />
                <Card.Body>
                    <Card.Title>{restaurant.resto_name}</Card.Title>
                    <Card.Text>
                        {menuItems.length > 0 && menuItems.map(menu => (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img rounded src={menu.img} height="250" />
                                <Card.Body>
                                    <Card.Title>{menu.name}</Card.Title>
                                    <Card.Text>
                                        {menu.special_ingredients}
                                    </Card.Text>
                                    <Card.Footer className="text-muted">Price: USD {menu.price}</Card.Footer>
                                </Card.Body>
                            </Card>
                        ))
                        }
                    </Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Add Menu</Button>
                    <AddMenu
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        resto_id={restaurant.id}
                    />
                </Card.Body>
            </Card>
                )}

            </Col>
        </Row>
    )

}

Business.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(Business)
