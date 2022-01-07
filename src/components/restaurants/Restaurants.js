import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import img01 from './../../images/o1.jpg'
import img02 from './../../images/o1.jpg'
import ReactStars from 'react-rating-stars-component'
import { Badge, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ApiConstants from './../../ApiConstants'

const Restaurants = props => {
  const ratingChanged = (rating) => {
    console.log(rating)
  }
  const [restaurants, setRestaurants] = useState([])
  useEffect(async () => {
    const res = await axios.get(ApiConstants.Service.identity+'/poi/resto/all')
    setRestaurants(res.data)
  }, [])
  return (
    <section className="offer_section layout_padding-bottom">
      <div className="offer_container">
        <div className="container ">
          <div className="row">
            <div className="col-md-9">
              {restaurants && restaurants.length > 0 && restaurants.map(restaurant => (
                <div className="box">
                  <div className="img-box">
                    <img src={restaurant.img_url} alt="" />
                  </div>
                  <div className="detail-box resto-box">
                    <h5>
                      <Link to={`/restaurants/${restaurant.id}`} >{restaurant.resto_name}</Link>
                    </h5>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                      className="rating"
                    />

                    <Badge bg="danger">Closed</Badge><span className="text-muted">{'   '}{ restaurant.opens_at}{' - '}{restaurant.closes_at}</span><br /><br />

                    <Row>
                      <Col>
                        <i className="fas fa-parking" />{' '}<span className="text-muted fs-6">Parking available</span>
                      </Col>
                      <Col>
                        <i className="fas fa-seedling"></i>{' '}<span className="text-muted fs-6">Vegan Friendly</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <i className="fas fa-wine-glass-alt"></i>{' '}<span className="text-muted fs-6">Alcohol is served</span>
                      </Col>
                      <Col>
                        <i className="fas fa-utensils"></i>{' '}<span className="text-muted fs-6">Casual Dining</span>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm={12}>
                        <span className="text-muted">{restaurant.resto_specialization}</span>
                      </Col>
                    </Row>
                    <hr style={{ color: '#000000', backgroundColor: '#000000', height: .75, borderColor: '#000000' }} />

                    <Row>
                      <Col sm={3}>
                        <i class="fas fa-check-circle"></i>{' '}Takeout
                      </Col>
                      <Col sm={3}>
                        <i class="fas fa-check-circle"></i>{' '}Delivery
                      </Col>
                      <Col>
                        <a href="">
                          Order Now
                        </a>
                      </Col>

                    </Row>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Restaurants.propTypes = {

}

export default Restaurants
