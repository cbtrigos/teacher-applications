import React, { Component } from "react";
import axios from 'axios';
import {H1, Wrapper, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton, A_center} from '../constants/utils/Styling.jsx'
// import {login} from './utils'
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
import { Button} from "react-bootstrap";
import { Link, withRouter} from "react-router-dom";
import { login } from "../constants/utils/index.js";


class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false, 
      email: "",
      password: "",
    };
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);
  }
      formValid = () => {
        return emailRegex.test(this.state.email) > 0 && this.state.password.length > 6;
      };

      handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value });
      };


      handleSubmit = async e => {
        e.preventDefault();
        this.setState({ isLoading: true });

        axios 
        .post('http://localhost:5000/api/login', 
          {"email": this.state.email,
            "password": this.state.password, 
        }) 
        .then(response => {
          if (response.data.message==="login successful") {
            this.props.handleLogin(response.data.user);
          } 
          else if (response.data==='email does not exist'){
            alert(response.data)
          } else if (response.data==="email and password do not match"){
            alert(response.data)
          } else  alert('no can do')
        })
      };


  render() {
        return (
            <Wrapper>
            <FormWrapper>
                <H1>Login</H1>
                <Form onSubmit = {this.handleSubmit} noValidate>
                <New>
                    <Label htmlFor="email">Email </Label>
                    <Input
                        type = "text"
                        className=""
                        placeholder="Email"
                        name="email"
                        noValidate
                        onChange={this.handleChange}
                        />

                </New>
                <New>
                    <Label htmlFor="password"> Password</Label>
                    <Input
                        className=""
                        placeholder="Password"
                        type="password"
                        name="password"
                        noValidate
                        onChange={this.handleChange}
                        />
                 
                </New>
                <CreateButton type="submit" disabled={!this.formValid(this.state)} >Sign in</CreateButton>
                <A_center href="/password-forgot"> Forgot your password? </A_center>
                <A_center href="/register"> Don't have an account? Register here! </A_center>
                </Form>
            </FormWrapper>
            </Wrapper>
            );

    };
};


export default withRouter(Login);
