import React, { Component } from 'react';
import styled from "styled-components"
import axios from 'axios'
import {H1, Wrapper, FormWrapper, Error, Form, Input, CreateButton, A, ErrorMessage} from '../../constants/utils/Styling.jsx'


const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default class PasswordForgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '', 
      code: '',
      passwordConfirm: '', 
      formErrors: {
        password: '',
        passwordConfirm: ''
      },
      sent: false, 
      showError: false,
      showNullError: false,
      messageFromServer: '',
    };
  }

    handleChangeSave = input => e => {
      this.setState({ [input]: e.target.value });
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
        switch (input) {
          case "password":
            formErrors.password =
            !passwordRegex.test(value) ? "required: at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character" : "";
            formErrors.passwordConfirm =
            value !== this.state.passwordConfirm ? "Passwords are not equal" : ""
          break;
          case "passwordConfirm":
            formErrors.passwordConfirm =
            value !== this.state.password ? "Passwords not equal" : "";
          break;
    }
    this.setState({ formErrors, [name]: value });

    }

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
        this.setState({
          sent: true,
          showError: false,
          messageFromServer: 'recovery email sent',
          showNullError: false,
        });
          const response = await axios.post(
            'http://localhost:5000/api/password-forgot',
            {
              email,
            },
          );

    }
    };


    updatePassword = async (e) => {
      event.preventDefault();
      axios 
        .post('http://localhost:5000/api/submit-application', 
          {"application_id": this.state.application_id
        }) 
        .then(response => {
          if (response.data==="application submitted successfully") {
          } else {console.log(response.data)}
        }).catch(error => {
          dispatch({
              type: "FETCH_FAILED",
              payload: error
          });
      });
    }
 
  render() {
    const { email, password, passwordConfirm, code, formErrors } = this.state;
    const values = {email, password, passwordConfirm, code, formErrors}
    var register = <A href='/register'>here</A>;
    return (
      <Wrapper>
        {!this.state.sent && 
        <FormWrapper> 
      <H1>Find your account</H1>
        <Form onSubmit = {this.sendEmail}>
        <Input
          type = "text"
          value = {email}
          label="email"
          id='email'
          onChange={this.handleChangeSave('email') }
          placeholder='Email Address'
          />
        <CreateButton type='submit'
         >Send Password Reset Email</CreateButton> 
        </Form>
        </FormWrapper> 
        }
      
      {this.state.sent && 
        <UpdatePass handleChangeSave={this.handleChangeSave} values = {values} updatePassword={this.updatePassword}/>}
    </Wrapper>
    );
  }
}




export class UpdatePass extends Component {
  constructor(props) {
    super(props);
  }
  
  updatePassword = () => {
    // verify the code
    // update the password

  }
 
  render() {
    const {values, handleChangeSave, updatePassword} = this.props;
    return (
      <FormWrapper> 
        <H1>Find your account</H1>
        <Form onSubmit = {updatePassword}>
        <Input
          type = "text"
          value = {values.code}
          label="code"
          id='code'
          onChange={handleChangeSave('code') }
          placeholder='Emailed Code'
          />
        <Input
          type = "password"
          value = {values.password}
          label="password"
          id='password'
          onChange={handleChangeSave('password') }
          placeholder='New password'
          />

        {values.formErrors.password!=='' && (
          <ErrorMessage>
              {values.formErrors.password}    
          </ErrorMessage>
        )}
        <Input
          type = "password"
          value = {values.passwordConfirm}
          label="passwordConfirm"
          id='passwordConfirm'
          onChange={handleChangeSave('passwordConfirm') }
          placeholder='Confirm new password'
          />

        {values.formErrors.passwordConfirm!=='' && (
          <ErrorMessage>
              {values.formErrors.passwordConfirm}    
          </ErrorMessage>
        )}
        <CreateButton 
          type='submit'
         >Change Password</CreateButton> 
        </Form>

        </FormWrapper>
    );
  }
}
