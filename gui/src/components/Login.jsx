import React, { Component } from "react";
import axios from 'axios';
import {H1, Wrapper, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton, A_center} from '../constants/utils/Styling.jsx'
import { withRouter} from "react-router-dom";
import { CircularProgress } from '@material-ui/core';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
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
      this.setState({
        error: 'loading'
      })
      axios 
      .post('http://localhost:5000/api/login', 
        {"email": this.state.email,
          "password": this.state.password, 
      }) 
      .then(response => {
        if (response.data.message==='login successful') { 
          this.props.handleLogin(response.data.user);
        } 
        else { 
          this.setState({
            error: response.data.message
          })
        } 
      })
    };


  render() {
        return (
            <Wrapper>
            <FormWrapper>
                <H1>Login</H1>
                {this.state.error==='loading' 
                  ?   <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div>
                  : this.state.error!=='' && <ErrorMessage>{this.state.error}</ErrorMessage>}

              <Form onSubmit = {this.handleSubmit} noValidate>
                <New>
                    <Label htmlFor="email">Email </Label>
                    <Input
                        type = "text"
                        className=""
                        name="email"
                        noValidate
                        onChange={this.handleChange}
                        />

                </New>
                <New>
                    <Label htmlFor="password"> Password</Label>
                    <Input
                        className=""
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
