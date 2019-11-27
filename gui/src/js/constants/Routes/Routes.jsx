import React from 'react';
import { Route, Switch } from "react-router-dom";

import Modules from "../../components/PublicPages/FrontModules.jsx";
import Faq from "../../components/PublicPages/Faq.jsx";
import Login from "../../components/Login.jsx";
import Contact from "../../components/PublicPages/Contact.jsx";
import Register from "../../components/Registration/Register.jsx"
import PasswordForgot from "../../components/Registration/PasswordForgot.jsx"
// import ResetPassword from "../../components/Registration/ResetPassword.jsx"
import NotFound from "../../components/NotFound.jsx"
import Dashboard from "../../components/Dashboard.jsx"
import Application from "../../components/ApplicantDashboard/Application.jsx"
import AppliedRoute from "./AppliedRoute.jsx"
import UnauthenticatedRoute from "./UnauthenticatedRoute.jsx"
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import AcountPage from "../../components/Account/AccountPage.jsx"
import AuthenticatedUserRoute from "./AuthenticatedUserRoute.jsx"

// the following don't discriminate based on user_type: 
  // AuthenticatedRoute let's you go to the given component if you're logged in --> else takes you to /login 
  // UnauthenticatedRoute let's you go to the given component if you're NOT logged in --> else you go to /dashboard
  // AppliedRoute doesn't care if you are or are not logged in
  // Route at the bottom is a catch-all; any other URL takes you to a notfound page 

// these are based on user_type:
  // AuthenticatedUserRoute works like AuthenticatedRoute but redirects to dashboard if not user_type===0

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

            <UnauthenticatedRoute
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
              path="/my-account"
              exact
              component={AcountPage}
              props={childProps}
            /> 

            <AuthenticatedRoute
              path="/dashboard"
              exact
              component={Dashboard}
              props={childProps}
            /> 
            <AuthenticatedUserRoute 
              path="/dashboard/new-application"
              exact
              component={Application}
              props={childProps}
            /> 

            <Route component={NotFound} /> 
    </Switch>
    );

