import ReactDOM from "react-dom";
import React, { Component, useState, useEffect } from 'react';

import NavBar from "./NavBar.jsx";
import Modules from "./FrontModules.jsx";
import Faq from "./Faq.jsx";
import Login from "./Login.jsx";
import Contact from "./Contact.jsx";
import Register from "./Registration/Register.jsx"
import PasswordForgot from "./Registration/PasswordForgot.jsx"
import ResetPassword from "./Registration/ResetPassword.jsx"
import ApplicantDash from "./ApplicantDashboard/ApplicantDash.jsx"
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {logout, isLogin} from './utils'

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={()=> (
    isLogin() ?
    <Component/>
    : <Redirect to='/login'/>
  )}/>
)

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isLogin: isLogin(), 
        user: null, 
      };
  }


  
  // userLogin = input => e => {
  //   event.preventDefault();
  //   this.setState({ 
  //     logged_in: true,
  //     user: [input]
  //   });
  // }

  handleLogout = () => {
    logout();
    this.setState({
        isLogin: false
    })
}

  render() {
    return (
      <div> 
        <NavBar title='teacher portal'/>   
         <Router> 

          <Route path='/faq' exact component ={Faq}/>  
          <Route path='/contact' exact component ={Contact}/>  
          <Route path='/password-forgot' exact component ={PasswordForgot}/>  
          <Route path='/login' exact component = {Login} userLogin={this.userLogin}/>   
          <Route path="/" exact component = {Modules}/> 
          <Route path='/register' exact component ={Register}/>
          <Route path='/reset'  component ={ResetPassword}/>
          <Route path='/dashboard' component = {ApplicantDash} />
          <PrivateRoute path='/dashboard' component = {ApplicantDash}/>

      </Router>
      </div>

    );
}}
const wrapper = document.getElementById("welcome-page");
wrapper ? ReactDOM.render(<Portal />, wrapper) : false;

