import React from 'react';
import axios from 'axios'

import {FormUserDetails, Submit} from "./RegistrationInfo.jsx"
import { login } from '../utils';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");


export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      DOB: '',
      password1: '', 
      password2: '', 
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        DOB: '',
        password1: '',
        password2: '',
      },
    };
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  validateForm = () => {
    let valid = true;
    Object.values(this.state.formErrors).forEach(
      (e) => e.length > 0 && (valid = false)
    );
    Object.values(this.state).forEach(
      (val) => val === '' && (valid = false)
    );
    return valid;
  }
  
  submit = (event) => {
    event.preventDefault();
    
      axios 
        .post('http://localhost:5000/api/register', 
          {"email": this.state.email,
            "password": this.state.password1, 
            "gender": this.state.gender, 
            "first_name": this.state.firstName, 
            "last_name": this.state.lastName, 
            "birth_date": this.state.DOB
        }) 
        .then(response => {
          if (response.data.message==="user registered sucessfully") {
            this.props.handleLogin(response.data.user)
          } 
        })



  }

  handleChangeSave = input => e => {
    this.setState({ [input]: e.target.value });
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
      switch (input) {
        case "firstName":
          formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
        case "lastName":
          formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
        case "email":
          formErrors.email =
          emailRegex.test(value) ? "" : "invalid email address";
        break;
        case "gender":
          formErrors.gender =
          value.length === 0 ? "Please select your gender" : ""
        break;
        case "DOB":
          formErrors.DOB =
          value.length < 10 ? "date not valid" : ""
        break;
        case "password1":
          formErrors.password1 =
          !passwordRegex.test(value) ? "required: at least 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character" : "";
          formErrors.password2 =
          value !== this.state.password2 ? "Passwords are not equal" : ""
        break;
        case "password2":
          formErrors.password2 =
          value !== this.state.password1 ? "Passwords not equal" : "";
        break;
  }
  this.setState({ formErrors, [name]: value });

  }

  render() {
    const { step, firstName, lastName, email, gender, DOB, password1, password2, formErrors} = this.state;
    const values = { firstName, lastName, email, gender,  DOB, password1, password2, formErrors};

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChangeSave={this.handleChangeSave}
            submit = {this.submit}
            validateForm = {this.validateForm}
            values={values}
          />
          );
      case 2:
        return (
          <Submit
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return <Success />;
    }
  }
}


