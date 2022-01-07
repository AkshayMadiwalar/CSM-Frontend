import "./App.css";
import Navbar from './components/layouts/Navbar';
import Slider from './components/layouts/Slider';
import herobg from './images/landing-img.jpg';
import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Restaurants from './components/restaurants/Restaurants';
import Resto from './components/restaurants/Resto';
import Menu from './components/restaurants/Menu';
import Cart from './components/restaurants/Cart';
import AddBusiness from './components/business-account/AddBusiness';
import Business from './components/business-account/Business';
import AddRestaurant from './components/business-account/AddRestaurant';
import LoginBusiness from './components/business-account/LoginBusiness';

import { useEffect } from 'react';
import { Provider } from 'react-redux'
import Sticky from 'react-sticky-el'
import store from './store'
import { loadUser } from './actions/auth';
import { Alert } from 'react-bootstrap';
import ShowAlert from './components/alerts/ShowAlert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import MyOrders from './components/myorders/MyOrders';
import AddReview from "./components/reviews/AddReview";
import WriteReview from "./components/reviews/WriteReview";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {
  console.log("app.js load user => first -------------")
  useEffect(() => {
    console.log("OK fine ")
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Fragment>
        <div className="hero_area">
          <div className="bg-box">
            <img src={herobg} alt="" />
          </div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Slider />} />
            <Route path="/home" element={<Slider />} />
          </Routes>
        </div>
        <ShowAlert />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/restaurants" element={<PrivateRoute />}>
            <Route path="/restaurants" element={<Restaurants />} />
          </Route>

          <Route path="/restaurants/:id" element={<Resto />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/add-business" element={<AddBusiness />} />
          <Route path="/login-business" element={<LoginBusiness />} />

          <Route path="/business" element={<PrivateRoute />}>
            <Route path="/business" element={<Business />} />
          </Route>

          <Route path="/add-restaurant" element={<PrivateRoute />}>
            <Route path="/add-restaurant" element={<AddRestaurant />} />
          </Route>

          <Route path="/myorders" element={<PrivateRoute />}>
            <Route path="/myorders" element={< MyOrders/>} />
          </Route>

          <Route path="/reviews" element={<PrivateRoute />}>
            <Route path="/reviews" element={< AddReview/>} />
          </Route>

          <Route path="/reviews/writeReview/:id" element={<PrivateRoute />}>
            <Route path="/reviews/writeReview/:id" element={< WriteReview/>} />
          </Route>


          <Route path="/alert" element={<ShowAlert />} />
        </Routes>
      </Fragment>
    </Provider>
  );
}

export default App;
