import ReactDOM from "react-dom";
import React from "react";
import {withRouter } from "react-router-dom";
import Routes from "../constants/Routes/Routes.jsx"
import { BrowserRouter as Router} from 'react-router-dom';
import {logout, isLogin, login, getUser} from '../constants/utils'
import NavBar from "./NavBar.jsx";

// this is the top-most component

class Portal extends React.Component {
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
        if (isLogin()) {
          const userInfo = getUser()
          this.setState({ 
            isAuthenticated: true,
            user:userInfo,
           });
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
          handleLogout: this.handleLogout,
          user: this.state.user
        };
        return (
          !this.state.isAuthenticating &&
          <div> 
          <Router> 
              <NavBar childProps={childProps} />
              <Routes childProps={childProps} /> 
          </Router >
          </div>
    );
}}
export default withRouter(Portal);

const wrapper = document.getElementById("welcome-page");
wrapper ? ReactDOM.render(<Portal />, wrapper) : false;
