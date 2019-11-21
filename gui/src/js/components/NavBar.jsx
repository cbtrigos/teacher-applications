import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      console.log(this.props.childProps)
      const {handleLogout, isAuthenticated, user} = this.props.childProps;
      return (

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
            {isAuthenticated
              ? <Fragment>
                {user.user_type===0
                  ?
                    <NavDropdown title="Dashboard" id="basic-nav-dropdown" >
                      <LinkContainer to="/dashboard" >
                        <NavItem>My Dashboard</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/my-applications">
                        <NavItem>My Applications</NavItem>
                      </LinkContainer>
                        <LinkContainer to="/dashboard/new-application">
                          <NavItem>Start New Application</NavItem>
                        </LinkContainer>
                    </NavDropdown>  
                  : 
                    <LinkContainer to="/dashboard">
                      <NavItem>My Dashboard</NavItem>
                    </LinkContainer>  
                }
                <NavDropdown title="My Account" id="basic-nav-dropdown" >
                  <LinkContainer to="/my-account">
                    <NavItem>My Account</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </NavDropdown>  
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

      );
    }
  }

