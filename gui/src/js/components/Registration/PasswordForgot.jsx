import React, { Component } from 'react';
import styled from "styled-components"
import axios from 'axios'
import {H1, Wrapper, FormWrapper, Error, Form, Input, CreateButton, A} from '../Styling.jsx'



const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default class PasswordForgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      showError: false,
      showNullError: false,
      messageFromServer: '',
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })};

    sendEmail = async (e) => {
      e.preventDefault();
      const { email } = this.state;
      if (email === '') {
        this.setState({
          showError: false,
          messageFromServer: '',
          showNullError: true,
        });
      } else if (!emailRegex.test(email)) {
        this.setState({
          showError: 'not valid email',
          messageFromServer: '',
          showNullError: false,
        });
      }else {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/password-forgot',
            {
              email,
            },
          );
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        } catch (error) {
          console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: 'not recognized',
              messageFromServer: '',
              showNullError: false,
            });
        }
      }
    }
  };
 
  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    var register = <A href='/register'>here</A>;
    return (
      <Wrapper>
      <FormWrapper> 
      <H1>Find your account</H1>
        <Form onSubmit = {this.sendEmail}>
        <Input
          type = "text"
          value = {email}
          label="email"
          id='email'
          onChange={this.handleChange('email') }
          placeholder='Email Address'
          />
        <CreateButton type='submit'
         >Send Password Reset Email</CreateButton> 
        </Form>
        {showNullError && (
          <Error>The email address cannot be null.</Error>
        )}
        {showError=='not recognized' && (
          <Error>
              That email address isn&apos;t recognized. Please check it and try again or
              register for a new account {register}. 
            
          </Error>
        )}
        {showError=='not valid email' && (
          <Error>
              Not a valid email. Please check it and try again. 
          </Error>
        )}
        {(messageFromServer === "recovery email sent") && (
          <Error>Password reset email successfully sent!
        
        <A href="/"> Go Home </A>  </Error>)}
        </FormWrapper>
    </Wrapper>
    );
  }
}
