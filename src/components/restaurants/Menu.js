import React, { useState } from 'react'
import PropTypes from 'prop-types'
import menuImg from './../../images/f1.png'
import {Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../../actions/cart'
import { connect } from 'react-redux'

const Menu = props => {

  const menuArray = []
  for (var i = 0; i < props.menu.length; i = i + 3) {
    let miniArr = []
    if(props.menu[i]){
      miniArr.push(props.menu[i])
    }
    if(props.menu[i+1]){
      miniArr.push(props.menu[i+1])
    }
    if(props.menu[i+2]){
      miniArr.push(props.menu[i+2])
    }
    menuArray.push(miniArr)
  }

  const [toggleCartButton,setToggleCartButton] = useState([])

  const addItem = (menuItem) => {
    const menuid = menuItem.id
    setToggleCartButton([...toggleCartButton,menuid])
    props.addToCart(menuItem)
  }

  const removeItem = (menuItem) => {
    const menuid = menuItem.id
    setToggleCartButton(toggleCartButton.filter(item=> item!=menuid))
    props.removeFromCart(menuItem)
  }




  return (

    <section className="food_section layout_padding menu-sec-pad">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            Our Menu
          </h2>
        </div>

        <div className="filters-content">
          
            { menuArray.map(menuRow => (
              <div className="row grid">
              {
                menuRow.map(menuItem => (
                  <div className="col-sm-6 col-lg-4 all pizza">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={menuItem.img} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>
                          {menuItem.name}
                        </h5>
                        <p>
                          {menuItem.special_ingredients}
                        </p>
                        <div className="options">
                          <h6>
                            $ {' '}{menuItem.price}
                          </h6>
                          
                          {/* <a onClick={(e)=>{}}>
                          <i class="fas fa-shopping-cart"></i>
                          </a> */}
                          {!toggleCartButton.includes(menuItem.id) && (
      <Button className="rounded-pill" style={{backgroundColor:'#ffbe33'}} onClick={()=>addItem(menuItem)}>
      <i class="fas fa-shopping-cart">{'  '}Add to Cart</i></Button>
                          )}
                    
                          
                          {toggleCartButton.includes(menuItem.id) && (
                          <Button className="rounded-pill" style={{backgroundColor:'#ffbe33'}} onClick={()=>removeItem(menuItem)}>
                          <i class="fas fa-shopping-cart">{'  '} Remove from Cart</i></Button>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                ))
              }
            </div>
            ))}
         


 
          


          
        </div>


        <div className="btn-box">
          <a href="">
            View More
          </a>
        </div>
      </div>
    </section>
  )
}

Menu.propTypes = {

}

export default connect(null,{addToCart, removeFromCart})(Menu)
