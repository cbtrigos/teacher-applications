import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const {handleLogout, isAuthenticated} = this.props;
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
                 <NavDropdown title="Dashboard" id="basic-nav-dropdown" >
                  <LinkContainer to="/dashboard/welcome" >
                    <NavItem>My Dashboard</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/dashboard/my-applications">
                    <NavItem>My Applications</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/dashboard/new-application">
                    <NavItem>Start New Application</NavItem>
                  </LinkContainer>
                </NavDropdown>  
              <NavItem onClick={handleLogout}>Logout</NavItem>

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

