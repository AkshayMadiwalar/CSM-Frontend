import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import {geolocated} from 'react-geolocated'
import geohash from 'latlon-geohash'


const Slider = props => {

    if(props.isGeolocationAvailable){
        if(props.isGeolocationEnabled){
            const latitude = props.coords && props.coords.latitude
            const longitude = props.coords && props.coords.longitude
            console.log(latitude,longitude)
            const geoHashCode = geohash.encode(latitude,longitude,12)
            console.log(geoHashCode)
        }
    }
    const [term, setTerm] = useState(props.term || '');
    const [location, setLocation] = useState(props.location || '');


    function submit(e) {
        if (typeof props.search === 'function') {
            props.search(term, location);
        }
        console.log(term, location);
        e.preventDefault();
    }
    const sizeClass = props.small ? '' : 'is-medium';
    return (
        <section className="slider_section ">
            <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-12 col-lg-6 ">
                                    <div className="detail-box">
                                    <h1>
                                            We Are Open
                                        </h1>
                                        <p>
                                        Find restaurants, home servies, theaters, events, Bristo users can submit a review of their products or services using a one to five star rating scale.
                                        </p>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Near</Form.Label>
                                                <Form.Control type="text" placeholder="San Fransico, CA" />
                                            </Form.Group>
                                        </Form>
                                        <div className="btn-box">
                                            <a href="" className="btn1">
                                                Search
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 ">
                                    <div className="detail-box">
                                        <h1>
                                            We Are Open
                                        </h1>
                                        <p>
                                        Find restaurants, home servies, theaters, events, Bristo users can submit a review of their products or services using a one to five star rating scale.
                                        </p>
                                        <div className="btn-box">
                                            <a href="" className="btn1">
                                                Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 ">
                                    <div className="detail-box">
                                        <h1>
                                            Fast Food Restaurant
                                        </h1>
                                        <p>
                                            Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                                        </p>
                                        <div className="btn-box">
                                            <a href="" className="btn1">
                                                Order Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ol className="carousel-indicators">
                        <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
                        <li data-target="#customCarousel1" data-slide-to="1"></li>
                        <li data-target="#customCarousel1" data-slide-to="2"></li>
                    </ol>
                </div>
            </div>

        </section>
    )
}

Slider.propTypes = {

}

export default geolocated()(Slider)
