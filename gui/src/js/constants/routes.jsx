import React from 'react';
import { Route, Switch } from "react-router-dom";

import Modules from "../components/FrontModules.jsx";
import Faq from "../components/Faq.jsx";
import Login from "../components/Login.jsx";
import Contact from "../components/Contact.jsx";
import Register from "../components/Registration/Register.jsx"
import PasswordForgot from "../components/Registration/PasswordForgot.jsx"
import ResetPassword from "../components/Registration/ResetPassword.jsx"
import ApplicantDash from "../components/ApplicantDashboard/ApplicantDash.jsx"
import NotFound from "../components/NotFound.jsx"


import AppliedRoute from "./AppliedRoute.jsx"
import UnauthenticatedRoute from "./UnauthenticatedRoute.jsx"
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"

// AuthenticatedRoute let's you go to the given component if you're logged in --> else takes you to /login 
// UnauthenticatedRoute let's you go to the given component if you're NOT logged in --> else you go to /dashboard
// AppliedRoute doesn't care if you are or are not logged in
// Route at the bottom is a catch-all; any other URL takes you to a notfound page 

  export default ({ childProps }) => (
    <Switch>
            <AppliedRoute 
              path="/" 
              exact 
              component = {Modules} 
              props={childProps}/>
            <AppliedRoute 
              path='/faq' 
              exact 
              component ={Faq} 
              props={childProps}/>  
            <AppliedRoute 
              path='/contact' 
              exact 
              component ={Contact} 
              props={childProps}/>  
            <AppliedRoute 
              path='/password-forgot' 
              exact 
              component ={PasswordForgot} 
              props={childProps}/>  

            <UnauthenticatedRoute
              path="/login"
              exact
              component={Login}
              props={childProps}
            />
            <UnauthenticatedRoute
              path="/register"
              exact
              component={Register}
              props={childProps}
            /> 

            <AuthenticatedRoute 
              path='/dashboard' 
              component = {ApplicantDash} 
              props={childProps}/>
              
             {/* <UnauthenticatedRoute path='/login/reset'  component ={ResetPassword} props={childProps}/> */}

            <Route component={NotFound} /> 
    </Switch>
    );
