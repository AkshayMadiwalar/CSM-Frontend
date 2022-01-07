import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, ListGroup, Button, Form, InputGroup, FormControl, Alert } from 'react-bootstrap'
import Sticky from 'react-sticky-el'
import { connect } from 'react-redux'
import axios from 'axios'
import {s3, bucketName} from './../../awsconfig/aws'
import ShowAlert from './../alerts/ShowAlert'
import { Navigate } from 'react-router'
import ApiConstants from './../../ApiConstants'

const AddRestaurant = props => {
    const [firstForm, setFirstForm] = useState(true)
    const [secondForm, setSecondForm] = useState(false)
    const [thirdForm, setThirdForm] = useState(false)

    const onSubmitFirstForm = async (e) => {
        e.preventDefault();
        setFirstForm(false)
        setSecondForm(true)
    }

    const onSubmitSecondForm = async (e) => {
        e.preventDefault();
        setSecondForm(false)
        setThirdForm(true)
        const outletString = outlets.toString()
        console.log("to string",typeof(outletString))
        console.log(openDaysArr)
        setFormData({...formData,
            cuisine: cuisines.toString(),
            openDays: openDaysArr.toString(),
            outletType: outletString.toString(),
            ownerId: props.auth.user.id
        })     
    }



    const cuisineTypes = ['Afghan', 'African', 'American', 'Arabian', 'Armenian', 'Asian', 'Asian Fusion', 'Australian', 'Bakery', 'Bar Food', 'BBQ', 'Belgian', 'Bengali', 'Biryani', 'Brazilian', 'British', 'Bubble Tea', 'Burger', 'Burmese', 'Cafe', 'Cafe Food', 'Cake', 'Cantonese', 'Chicken', 'Charcoal Chicken', 'Chili', 'Chinese', 'Coffee', 'Continental', 'Desserts', 'Drinks Only', 'Egyptian', 'Ethiopian', 'European', 'Fast Food', 'French',
        'Fried Chicken', 'Frozen', 'Fusion', 'German', 'Goan', 'Greek', 'Grill', 'Hot Dogs', 'Hyderabadi', 'Ice Cream', 'Indian', 'Irish', 'Italian', 'Japanese', 'Kashmiri', 'Kebab', 'Korean', 'Malaysian', 'Mexican', 'Momos', 'North Indian', 'Oriental', 'Parsi', 'Pizza', 'Rolls', 'Salad', 'Sandwich', 'South Indian', 'Spanish', 'Steak', 'Street Food', 'Swedish', 'Wraps'
    ]

    const [formData,setFormData] = useState({
        latitude: "",
        longitude: "",
        ownerId:"",
        restoName: "",
        poiCategory:"restaurants",
        establishmentType:"",
        outletType:"",
        opensAt:"",
        closesAt:"",
        openDays:"",
        cuisine:"",
        addressLine:"",
        city:"",
        country:"",
        zipcode:"",
        restaurantContactNumber:"",
        restoSpecialization:"",
        restoHistory:""
    })


    const { latitude ,longitude, ownerId ,restoName, establishmentType,outletType,opensAt,closesAt,openDays,
    cuisine,addressLine,city,country,zipcode,restaurantContactNumber, restoSpecialization,restoHistory
    }  = formData

    const [imgfile, setImgFile] = useState([])

    const onChangeData =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const [outlets,setOutlets] = useState([])
    const onOutletCheckBoxData = (e)  => {
        console.log(e)
        if(e.target.checked){
            setOutlets([...outlets,e.target.name])
        }else{
            const index = outlets.indexOf(e.target.name)
            if(index > -1){
                setOutlets(outlets.splice(index,1))
            }
        } 
        console.log(outlets)
    }

    const [cuisines,setCusisines] = useState([])
    const onCuisineCheckBoxData = (e) => {
        if(e.target.checked){
            setCusisines([...cuisines,e.target.name])
        }else{
            const index = cuisines.indexOf(e.target.name)
            if(index > -1){
                setCusisines(cuisines.splice(index,1))
            }
        }
    }

    const [openDaysArr,setOpenDaysArr] = useState([])
    const onChangeOpenDaysCheckBox = (e) => {
        if(e.target.checked){
            console.log(e.target.name)
            setOpenDaysArr([...openDaysArr,e.target.name])
        }else{
            const index = openDaysArr.indexOf(e.target.name)
            console.log(openDaysArr)
            if(index > -1){
                openDaysArr.splice(index,1)
            }

        }
    }

    const onSubmitThirdForm = async (e) => {
        e.preventDefault();
        setThirdForm(false)
        console.log(formData)
        console.log(props.auth.user.id)
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        try {
            console.log(formData) 

            const imageName = `restaurants/${props.resto_id}/cover.jpg`
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
            const res = await axios.post(ApiConstants.Service.identity+'/poi/resto/new-restaurant',{...formData,imageUrl},config) 
        } catch (error) {
            {(
                <ShowAlert variant="danger" message="Sorry! Try again"/>
            )}
        }
    }


    const uploadImgtoS3 = async (e) => {
        setImgFile([e.target.files[0]]) 
    }

    return (
        <Row>
            <Col sm={1}>
            </Col>
            <Col sm={3} style={{}}>
                <Sticky>
                    <Card style={{ width: '18rem', marginTop: 30 }}>
                        <Card.Header><bold>Create your Restaurant page</bold></Card.Header>
                        <ListGroup >
                            {firstForm ? (
                                <ListGroup.Item style={{ backgroundColor: '#ffbe33' }}>Restaurant Information<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Restaurant name,address, contact</span></ListGroup.Item>
                            ) :
                                (
                                    <ListGroup.Item>Restaurant Information<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Restaurant name,address, contact</span></ListGroup.Item>
                                )}
                            {secondForm ? (
                                <ListGroup.Item style={{ backgroundColor: '#ffbe33' }}>Restaurant Type and Timings<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Establishment & cuisine type, Open timings</span></ListGroup.Item>
                            ) : (
                                <ListGroup.Item>Restaurant Type and Timings<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Establishment & cuisine type, Open timings</span></ListGroup.Item>
                            )}

                            {thirdForm ? (
                                <ListGroup.Item style={{ backgroundColor: '#ffbe33' }}>Add Menu and Images<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Food, Photos, Best Sellers</span></ListGroup.Item>

                            ) : (
                                <ListGroup.Item>Add Menu and Images<br /><span className="text-muted fs-6" style={{ fontSize: 13 }}>Food, Photos, Best Sellers</span></ListGroup.Item>

                            )}
                        </ListGroup>
                    </Card>
                </Sticky>
            </Col>
            <Col sm={6} style={{ marginTop: 30 }}>
                {firstForm && (
                    <Card>
                        <Card.Header as="h5">Restaurant Information</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="restoName" value={restoName} placeholder="Restaurant Name" onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="country" value={country} placeholder="Restaurant Country"  onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="city" value={city} placeholder="Restaurant City"  onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="addressLine" addressLine value={addressLine} splaceholder="Restaurant Street address"  onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" name="zipcode" value={zipcode} placeholder="Restaurant Zipcode"  onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>

                                    <br />

                                    <Row>
                                        <Form.Label><span className="text-muted" style={{ fontSize: 13 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email the latitude and longitude coordinates of the restaurant place</span></Form.Label>
                                        <Col sm={6}>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="latitude" value={latitude} placeholder="Latitude"  onChange={(e)=>{onChangeData(e)}}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="longitude" value={longitude}placeholder="Longitude"  onChange={(e)=>{onChangeData(e)}}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr />
                                    <br />
                                    <Form.Group className="mb-3" >
                                        <Form.Label><span className="text-muted" style={{ fontSize: 13 }}>Your customers will call on this number for genereal queries</span></Form.Label>
                                        <Form.Control type="number" name="restaurantContactNumber" value={restaurantContactNumber} placeholder="Contact number at the restaurant"  onChange={(e)=>{onChangeData(e)}}/>
                                    </Form.Group>


                                    <br />
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Yes, I would like to recieve important notifcations from Bristo." />
                                    </Form.Group>

                                </Form>
                            </Card.Text>
                            <Button className="rounded-pill" style={{ backgroundColor: '#ffbe33', width: 100, float: 'right' }} onClick={(e) => onSubmitFirstForm(e)}>Next</Button>
                        </Card.Body>
                    </Card>
                )}

                {secondForm && (
                    <Card>
                        <Card.Header as="h5">Restaurant Type and Timings</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h6 className="fw-bold">Establishment Type</h6>
                                <Form.Check type="radio" name="establishmentType" value="Both delivery and dine available" label="Both delivery and dine available" aria-label="radio 1" onChange={(e)=>{onChangeData(e)}} />
                                <Form.Check type="radio" name="establishmentType" value="Only delivery available" label="Only delivery available" aria-label="radio 1" onChange={(e)=>{onChangeData(e)}}/>
                                <Form.Check type="radio" name="establishmentType" value="Only dine available" label="Only dine available" aria-label="radio 1" onChange={(e)=>{onChangeData(e)}}/>

                                <hr />
                                <h6>Select options which best describe your outlet</h6>

                                <Row>
                                    <Col>
                                        <Form.Check name="Bakery" onChange={(e)=>onOutletCheckBoxData(e)} label="Bakery" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Bar" onChange={(e)=>onOutletCheckBoxData(e)} label="Bar" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Beverage Shop" onChange={(e)=>onOutletCheckBoxData(e)} label="Beverage Shop" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check name="BUtcher Shop" onChange={(e)=>onOutletCheckBoxData(e)} label="Butcher Shop" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Cafe" onChange={(e)=>onOutletCheckBoxData(e)} label="Cafe" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Casual Dining" onChange={(e)=>onOutletCheckBoxData(e)} label="Casual Dining" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check name="Cocktail Bar" onChange={(e)=>onOutletCheckBoxData(e)}  label="Cocktail Bar" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="CLub" onChange={(e)=>onOutletCheckBoxData(e)} label="CLub" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Desert Parlour" onChange={(e)=>onOutletCheckBoxData(e)} label="Desert Parlour" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check name="Fine Dining" onChange={(e)=>onOutletCheckBoxData(e)} label="Fine Dining" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Food Court" onChange={(e)=>onOutletCheckBoxData(e)} label="Food Court" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Food Truck" onChange={(e)=>onOutletCheckBoxData(e)} label="Food Truck" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check name="Irani Cafe" onChange={(e)=>onOutletCheckBoxData(e)} label="Irani Cafe" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Lounge" onChange={(e)=>onOutletCheckBoxData(e)} label="Lounge" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Microbrewery" onChange={(e)=>onOutletCheckBoxData(e)} label="Microbrewery" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check name="Quick Bites" onChange={(e)=>onOutletCheckBoxData(e)} label="Quick Bites" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Shack" onChange={(e)=>onOutletCheckBoxData(e)} label="Shack" />
                                    </Col>
                                    <Col>
                                        <Form.Check name="Sweet Shop" onChange={(e)=>onOutletCheckBoxData(e)} label="Sweet Shop" />
                                    </Col>
                                </Row>

                                <hr />
                                <h6>Type of cuisines, Select options which best describe food your serve</h6>

                                <Row>
                                    <Col>
                                        {cuisineTypes.splice(0, 23).map(cuisine => (
                                            <Form.Check name={cuisine} onChange={(e)=>onCuisineCheckBoxData(e)} label={cuisine} />
                                        ))}
                                    </Col>
                                    <Col>
                                        {cuisineTypes.splice(0, 23).map(cuisine => (
                                            <Form.Check name={cuisine} onChange={(e)=>onCuisineCheckBoxData(e)} label={cuisine} />
                                        ))}
                                    </Col>
                                    <Col>
                                        {cuisineTypes.splice(0, 23).map(cuisine => (
                                            <Form.Check name={cuisine} onChange={(e)=>onCuisineCheckBoxData(e)} label={cuisine} />
                                        ))}
                                    </Col>
                                </Row>

                                <hr />
                                <br />

                                <h6> Retaurant operational hours </h6>
                                <Row>
                                    <Col>
                                        <input type="time" name="opensAt" value={opensAt}  onChange={(e)=>{onChangeData(e)}} id="inputMDEx1" className="form-control" />
                                        <label for="inputMDEx1">Opens at</label>
                                    </Col>
                                    <Col>
                                        <input type="time" name="closesAt" value={closesAt}  onChange={(e)=>{onChangeData(e)}} id="inputMDEx1" className="form-control" />
                                        <label for="inputMDEx1">Closes at</label>
                                    </Col>
                                </Row>

                                <hr />
                                <br />
                                <h6>Mark Open Days</h6>
                                <Row>

                                    <Col>
                                        <Form.Check label="Monday" value="Monday" name="Monday"  onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                        <Form.Check label="Tuesday" value="Tueday" name="Tuesday"  onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                        <Form.Check label="Wednesday" value="Wednesday" name="Wednesday" onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                        <Form.Check label="Thursday" value="Thursday" name="Thursday" onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                    </Col>
                                    <Col>
                                        <Form.Check label="Friday" value="Friday" name="Friday" onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                        <Form.Check label="Saturday" value="Saturday" name="Saturday" onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                        <Form.Check label="Sunday" value="Sunday" name="Sunday" onChange={(e)=>{onChangeOpenDaysCheckBox(e)}}/>
                                    </Col>
                                </Row>





                            </Card.Text>
                            <Button className="rounded-pill" style={{ backgroundColor: '#ffbe33' }} onClick={(e) => onSubmitSecondForm(e)}>Next</Button>
                        </Card.Body>
                    </Card>
                )}

                {thirdForm && (
                    <Card>
                        <Card.Header as="h5">Photo & more information</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Card border="warning" style={{ width: '25rem' }}>
                                    <Card.Header>Menu Item</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="restoSpecialization" value={restoSpecialization} placeholder="Restaurant Specials" onChange={(e)=>{onChangeData(e)}}/>
                                            </Form.Group>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Please upload a photo of your retaurant</Form.Label>
                                                <Form.Control type="file" onChange={(e)=>uploadImgtoS3(e)}/>
                                            </Form.Group>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Card.Text>
                            <Button className="rounded-pill" style={{ backgroundColor: '#ffbe33', minWidth: 50 }} onClick={(e) => onSubmitThirdForm(e)}>Submit</Button>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

AddRestaurant.propTypes = {

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{})(AddRestaurant)
