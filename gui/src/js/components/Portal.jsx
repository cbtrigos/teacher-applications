import ReactDOM from "react-dom";
import React, { Component, Fragment } from "react";
import {withRouter } from "react-router-dom";
import Routes from "../constants/Routes/Routes.jsx"
import { BrowserRouter as Router} from 'react-router-dom';
import {logout, isLogin, login, getUser} from '../constants/utils'
import NavBar from "./NavBar.jsx";

// this is the top-most component

class Portal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        isAuthenticating: true, 
        user: {}
      };
      this.handleLogin = this.handleLogin.bind(this);
    }

    async componentDidMount() {
      try {
        if (isLogin()) {
          const userInfo = getUser()
          this.setState({ 
            isAuthenticated: true,
            user:userInfo,
           });
        }}
      catch(e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
      this.setState({ isAuthenticating: false });

    }

    handleLogin = async (userInfo) => {
      await login(userInfo); 
      this.setState({ 
        isAuthenticated: true,
        user: userInfo
       });
    }

      handleLogout = async event => {
        await logout();
        this.setState({ 
          isAuthenticated: false,
          user: {}
        });
      }

      render() {
        const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          handleLogin: this.handleLogin,
          user: this.state.user
        };
        return (
          !this.state.isAuthenticating &&
          <div> 
          <Router> 
              <NavBar handleLogout={this.handleLogout} isAuthenticated={this.state.isAuthenticated} />
              <Routes childProps={childProps} /> 
          </Router >
          </div>
    );
}}
export default withRouter(Portal);

const wrapper = document.getElementById("welcome-page");
wrapper ? ReactDOM.render(<Portal />, wrapper) : false;
