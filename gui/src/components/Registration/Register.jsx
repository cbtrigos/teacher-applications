import React from 'react';
import axios from 'axios';
import ApplicantRegister from "./ApplicantRegister.jsx";
import ApproverRegister from "./ApproverRegister.jsx"
import { Wrapper, H1, H2, WideButton, CreateButton, FormWrapper } from '../../constants/utils/Styling.jsx';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

// In order to make the approver registration available: 
// 1. change the state.step = 0 and state.application_type = ''
// 2. in ./ApplicantRegister.jsx, uncomment the link on line 16 

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      application_type: 'Applicant',
      to_create_listing: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile_number: '',
      gender: '',
      DOB: '',
      password1: '', 
      password2: '', 
      title: '',
      school_district: '',
      approver_type: '',
      additional_info: '',
      school_name: '',
      emis_code: '',

      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        DOB: '',
        password1: '',
        password2: '',
        title: '',
        school_name: '',
        emis_code: '',
      },
      serverMessage: null, 
      toolTip: {
        approver_type: 'Select which approver type you wish to apply for. If none or multiple are applicable, please explain in the additional box below.',
        school_district: 'If applying to represent a school, enter the district where the school is located. If applying to represent a district, enter that district',
        school_name:'Official name of the school you are registering to make approvals for. If you are applying to approve more than one, please put N/A',
        emis_code: "The school's unique identification code via the Education Management Information System", 
        title: 'Your authorizing title. ex: Proprietor for school x, Education secretary for District y, Chairman of the Board of Governors for z',
        additional_info: "Please enter any additional information that you feel is both relevant and pertinent to your application that is not reflected above",
        to_create_listing: "Please check if you are a school proprietor or similar and wish to make a job listing public. Do not check if you wish to apply as a teacher."
      }
    };
  };

  validateForm = () => {
    let valid = true;
    Object.values(this.state.formErrors).forEach(
      (e) => e.length > 0 && (valid = false)
    );
    if (this.state.application_type ==='Approver') {
      Object.values(this.state).forEach(
        (val) => 
        val === '' && (valid = false)
      );
      }
    else {
      if (this.state.firstName==='' || this.state.lastName==='' || this.state.email==='' || this.state.DOB==='' || this.state.password1==='' || this.state.password2===''|| this.state.mobile==='' ||  this.state.gender==='' || this.state.to_create_listing==='') {
        valid= false
      }
    }
    return valid;
  }
  
  submitApplicant = (event) => {
    let type = null 
    if (this.state.to_create_listing ==="I wish to apply for a teacher position") {type=0}
    if (this.state.to_create_listing ==="I wish to submit a job listing") {type=4}
    event.preventDefault();
    this.setState({
      serverMessage: 'loading'
    })
      axios 
        .post(process.env.REACT_APP_API+'/api/register', 
          {"email": this.state.email,
            "password": this.state.password1, 
            "gender": this.state.gender, 
            "first_name": this.state.firstName, 
            "last_name": this.state.lastName, 
            "mobile_number": this.state.mobile_number,
            "birth_date": this.state.DOB,
            "user_type": type,
        }) 
        .then(response => {
          if (response.data.message==="user registered sucessfully") {
            this.props.handleLogin(response.data.user)
          } 
          else {
            this.setState({
              serverMessage: response.data
            })
          }
        })
  }
  submitApprover = (event) => {
    event.preventDefault();
    this.setState({
      serverMessage: 'loading'
    })
      axios 
        .post(process.env.REACT_APP_API+'/api/approver-request', 
          {"email": this.state.email,
            "password": this.state.password1, 
            "gender": this.state.gender, 
            "first_name": this.state.firstName, 
            "last_name": this.state.lastName, 
            "mobile_number": this.state.mobile_number,
            "birth_date": this.state.DOB,
            "user_type": 4, 
            "school_name": this.state.school_name, 
            "title": this.state.title, 
            "emis_code": this.state.emis_code,
            "approver_type": this.state.approver_type,
            "additional_info": this.state.additional_info,
            "school_district": this.state.school_district
        }) 
        .then(response => {
          if (response.data.message==="user registered sucessfully") {
            this.props.handleLogin(response.data.user)
          } 
          else {
            this.setState({
              serverMessage: response.data
            })
          }
        })
  }

  step = (application_type) => e => {
    if (application_type === 'Applicant') {
        this.setState({
          step: 1
      })
    }
    else if (application_type === 'Approver') {
      this.setState({
        step:2
      })
    }
    else if (application_type === 'Clear') {
      this.setState({
        step:0
      })
    }
  }

  handleChangeSave = input => e => {
    this.setState({ [input]: e.target.value });
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
      switch (input) {
        case "firstName":
          formErrors.firstName =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
        case "lastName":
          formErrors.lastName =
          value.length < 2 ? "minimum 2 characters required" : "";
        break;
        case "email":
          formErrors.email =
          emailRegex.test(value) ? "" : "invalid email address";
        break;
        case "mobile_number":
          formErrors.mobile_number =
          value.includes('*') ? "not a valid phone number" : "";
        break;
        case "gender":
          formErrors.gender =
          value.length === 0 ? "Please select your gender" : ""
        break;
        case "DOB":
          formErrors.DOB =
          value.length != 10  ? "date not valid" : ""
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
    const {to_create_listing, additional_info, approver_type, school_district, school_name, title, emis_code, firstName, serverMessage, mobile_number, lastName, email, gender, DOB, password1, password2, formErrors} = this.state;
    const values = {to_create_listing, additional_info, approver_type, school_district, school_name, title, emis_code, firstName, mobile_number, lastName, email, gender,  DOB, password1, password2, formErrors, serverMessage};
    const step = this.state.step;
    switch (step) {
      case 0: 
        return (
          <Wrapper>
            <FormWrapper>
              <H1>What type of user are you?</H1>
              <H2>Click applicant if you're applying to be a teacher, and approver if you're a school or educational administrator. </H2>
            <WideButton
                type = "button"
                value='Applicant'
                id='applicant'
                chosen={this.state.application_type==='applicant'}
                noValidate
                onClick={this.handleChangeSave('application_type')}
                />
             <WideButton 
                type = "button"
                value='Approver'
                chosen={this.state.application_type==='approver'}
                id='approver'
                onClick={this.handleChangeSave('application_type')}
             />
                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={this.step(this.state.application_type)}
                disabled={this.state.application_type===null}
              >Begin Application</CreateButton> 
            </FormWrapper>
            </Wrapper>
        )
      case 1:
          return (
            <ApplicantRegister
              handleChangeSave={this.handleChangeSave}
              submit = {this.submitApplicant}
              validateForm = {this.validateForm}
              values={values}
              step = {this.step}

            />
          );
      case 2: 
            return (
            <ApproverRegister
              handleChangeSave={this.handleChangeSave}
              submit = {this.submitApprover}
              toolTip = {this.state.toolTip}
              validateForm = {this.validateForm}
              values={values}
              step = {this.step}

            />
            )
    }    
    
    
    
    

  }
}


