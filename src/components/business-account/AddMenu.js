import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { s3, bucketName } from './../../awsconfig/aws'
import ShowAlert from '../alerts/ShowAlert'
import ApiConstants from './../../ApiConstants'

const AddMenu = props => {
    console.log(props)
    const [menuForm, setMenuForm] = useState({
        name: "",
        specialIngredients: "",
        price: "",
        imageUrl:"",
        poiRestoId: props.resto_id
    })

    useEffect(()=>{
        setMenuForm({...menuForm,poiRestoId:props.resto_id})
    },[props.resto_id])

    const { name, specialIngredients, price } = menuForm;

    const onChangeData = (e) => {
        setMenuForm({ ...menuForm, [e.target.name]: e.target.value })
    }

    const [imgfile, setImgFile] = useState([])

    const onUploadFile = async (e) => {
        setImgFile([e.target.files[0]])
    }

    const onSubmitData = async (e) => {
        e.preventDefault()
        console.log(menuForm)
        try {
            const imageName = `restaurants/${props.resto_id}/menu_${name}.jpg`
            console.log(imageName)
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Expires: 60,
                ContentType: 'image/*'
            }
            const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
            console.log(uploadUrl)
            await fetch(new Request(uploadUrl, {
                method: "PUT",
                body: imgfile[0],
                headers: new Headers({
                    "Content-Type": 'image/*',
                })
            }))
            const imageUrl = uploadUrl.split('?')[0]
            console.log(imageUrl)

            try {
                console.log("saving")
                const config = { 
                    headers: {
                        "Content-Type":"application/json"
                    }
                }
                console.log(menuForm)
                const res = await axios.post(ApiConstants.Service.identity+'/poi/resto/menu/new-menu-item', {...menuForm,imageUrl}, config)
               {res && props.onHide()}
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Menu Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" >
                    <Form.Label>Add your Dish</Form.Label>
                    <Form.Control type="text" name="name" value={name} placeholder="Dish Name" onChange={(e) => onChangeData(e)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={price} placeholder="Price of the Dish" onChange={(e) => onChangeData(e)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Special Ingredients</Form.Label>
                    <Form.Control type="text" name="specialIngredients" value={specialIngredients} onChange={(e) => onChangeData(e)} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload a photo</Form.Label>
                    <Form.Control type="file" name="file" onChange={(e) => { onUploadFile(e) }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <Modal.Footer>
                <Button onClick={(e) => { onSubmitData(e)}}>Submit</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

AddMenu.propTypes = {

}

export default AddMenu
