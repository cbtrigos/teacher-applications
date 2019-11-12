import ReactDOM from "react-dom";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Routes from "../constants/Routes.jsx"

// import NavBar from "./NavBar.jsx";
import { BrowserRouter as Router} from 'react-router-dom';
import {logout, isLogin, login, getUser} from './utils'
import {Tool, MenuButton, Right, Left} from './Styling.jsx'




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
            user:userInfo
           });
        }
      }
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
    {/* <NavBar title='teacher portal' handleLogout={this.handleLogout}/>    */}
            <Router> 
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Home</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <LinkContainer to="/faq">
                    <NavItem>FAQ</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/contact">
                    <NavItem>Contact</NavItem>
                  </LinkContainer>        
                  {this.state.isAuthenticated
                    ? <Fragment>
                    <LinkContainer to="/dashboard">
                      <NavItem>Dashboard</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>

                    </Fragment>
                    : <Fragment>
                        <LinkContainer to="/register">
                          <NavItem>Signup</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/login" >
                          <NavItem>Login</NavItem>
                        </LinkContainer>
                        </Fragment>
                  }   
    

                </Nav>
              </Navbar.Collapse>
          </Navbar> 
          <Routes childProps={childProps} />
          </Router >
          </div>
    );
}}
export default withRouter(Portal);

const wrapper = document.getElementById("welcome-page");
wrapper ? ReactDOM.render(<Portal />, wrapper) : false;
