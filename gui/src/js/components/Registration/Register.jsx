import React, { Component } from 'react';
import {FormUserDetails, Submit} from "./RegistrationInfo.jsx"
import axios from 'axios'
import { login } from '../utils';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
// const passwordRegex = RegExp(/(?=.*[0-9])/);
var passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");


export default class UserForm extends Component {
  state = {
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

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    Object.values(this.state).forEach(
      (val) => val.length === 0 && (valid = false)
    );
    return valid;
  }
  
  submit = (event) => {
    event.preventDefault();
    if(this.validateForm(this.state.formErrors)) {
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
          if (response.data==="user registered sucessfully") {
            console.log('registered successfully')
            login()
            this.props.history.push('/dashboard')
            
          } else if (response.data==='email already used'){
            console.log('email already used')
          }
          else {console.log(response.data)}
        })


    }else{
      console.log(this.state)
      console.error('Invalid Form')
    }
  }

  handleChangeSave = input => e => {
    event.preventDefault();

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
  // this.setState({ formErrors, [name]: value });
  // console.log(this.state)

  }

  render() {
    const { step, firstName, lastName, email, gender, DOB, password1, password2, submitted, formErrors} = this.state;
    const values = { firstName, lastName, email, gender,  DOB, password1, password2, submitted, formErrors};

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChangeSave={this.handleChangeSave}
            submit = {this.submit}
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


