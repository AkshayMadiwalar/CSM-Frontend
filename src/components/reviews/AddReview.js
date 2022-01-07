import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Button } from 'react-bootstrap'
import reviewImg from './../../images/review.jpg'
import ReactStars from 'react-rating-stars-component'
import axios from 'axios'
import ApiConstants from './../../ApiConstants'
import WriteReview from './WriteReview'
import { Navigate } from 'react-router-dom'

const AddReview = props => {

    const [pois, setPois] = useState([])
    const [writeReviewSection,setWriteReviewSection] = useState(false)
    const [writeReviewFor,setWriteReviewFor] = useState("")

    useEffect(async () => {
        const res = await axios.get(ApiConstants.Service.identity +'/poi/resto/all')
        console.log(res.data)
        setPois(res.data)
    },[])

    const writeReviewFunction = (id) =>{
        setWriteReviewFor(id)
        setWriteReviewSection(true)
    }

    if(writeReviewSection){
        const url = `writeReview/${writeReviewFor}`
        return <Navigate to={url}/>
    }

    return (
        <Fragment>
            <Card style={{ backgroundColor: '#d3d7de' }}>
                <Card.Body>
                    <Row style={{ margin: 20 }}>
                        <Col sm={2}>
                        </Col>
                        <Col>
                            <Card.Title class="font-weight-bold" style={{ fontSize: 26 }}>Your Review Awaits</Card.Title>
                            <br />
                            <Card.Text>
                                Review everything from your favorite burger to dentist
                            </Card.Text>
                        </Col>
                        <Col>
                            <img src={reviewImg} alt=""></img>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card>

                <Card.Body>
                    <Row style={{ marginLeft: 20, marginRight: 20 }}>
                        <Col sm={2}>
                        </Col>
                        <Col>
                            <Card.Title class="font-weight-bold" style={{ color: '#ffbe33', fontSize: 18 }}>See the Business you would like to review ?</Card.Title>
                            <Card.Text>
                                <hr />
                                {pois && pois.length > 0 && pois.map(poi => (
                                    <Row>
                                        <Col sm={3}>
                                            <img className="rounded" src={poi.img_url} width="130" />
                                        </Col>
                                        <Col sm={4}>
                                            <span className='font-weight-bold'>{poi.resto_name}</span>  <span style={{ fontSize: 13 }}>{poi.cuisin}</span>
                                            <Row>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    className="rating"
                                                />
                                                <span style={{ fontSize: 12, marginTop: 10, marginLeft: 5 }}>270 Reviews</span>
                                            </Row>
                                        </Col>
                                        <Col sm={3}>
                                            <Button variant="outline-warning"  onClick={() => writeReviewFunction(poi.id)}>Write a Review</Button>{' '}

                                        </Col>
                                        <Col>
                                            <Row>{poi.city}{' - '}{poi.zipcode}</Row>
                                            <Row>{poi.country}</Row>
                                        </Col>
                                        <Row>
                                            <br /><br /><br />
                                        </Row>
                                    </Row>
                                    
                                    
                                ))}


                            </Card.Text>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

AddReview.propTypes = {

}

export default AddReview
