import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { useParams } from 'react-router-dom'

const WriteReview = props => {
    const params = useParams();
    console.log(params.id)
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    className="rating"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form>
    )
}

WriteReview.propTypes = {

}

export default WriteReview
