import React, { Component } from "react";
import axios from 'axios';
import {H1, Wrapper, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton, A_center} from './Styling.jsx'
import {login} from './utils'
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    // const { enter } = this.props;
    e.preventDefault();
    if (formValid(this.state)) {
      axios 
      .post('http://localhost:5000/api/login', 
        {"email": this.state.email,
          "password": this.state.password, 
      }) 
      .then(response => {
        if (response.data==="login successful") {
          login() 
          this.props.history.push('/dashboard')

        } else if (response.data==='email does not exist'){
          console.log('email does not exist')
        } else if (response.data==='email and password do not match'){
          console.log('check the credentials')
        } else {console.log(response.data)}
      })
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "not a valid password" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;


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
                    {formErrors.email.length > 0 && (
                <ErrorMessage>{formErrors.email}</ErrorMessage>
              )}
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
                    {formErrors.password.length > 0 && (
                <ErrorMessage>{formErrors.password}</ErrorMessage>
              )}
                </New>
                <CreateButton type="submit">Sign in</CreateButton>
                <A_center href="/password-forgot"> Forgot your password? </A_center>
                <A_center href="/register"> Don't have an account? Register here! </A_center>
                </Form>
            </FormWrapper>
            </Wrapper>
            );

    };
};


