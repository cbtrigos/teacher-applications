import React, { Component } from "react";
import {Wrapper, FormWrapper,} from '../Styling.jsx'
import {PersonalInfo, TeacherInfo, ShortAnswer, Submit} from "./ApplicationInfo.jsx"
import styled from "styled-components";



// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

//   // validate form errors being empty
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

//   // validate the form was filled out
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });

//   return valid;
// };

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      application_id: null,
      application_type:'Secondary',
      employing_authority:null,
      school_name:null,
      other_names:null,
      mobile_number:null, 
      nationality: null, 
      prev_appt: null,
      pin_code: null,
      nassit: null,
      qualifications: null,
      special_skills: null,
      created: null,
      first_name:null,
      last_name:null,
      email: null,
      sex: null,
  formErrors: {
    email: "",
    password: ""
  }
};
  }

  submit = (event) => {
    event.preventDefault();
    // if(this.validateForm(this.state.formErrors)) {
    //   axios 
    //     .post('http://localhost:5000/api/application-submit', 
    //       {"email": this.state.email,
    //         "password": this.state.password1, 
    //         "gender": this.state.gender, 
    //         "first_name": this.state.firstName, 
    //         "last_name": this.state.lastName, 
    //         "birth_date": this.state.DOB
    //     }) 
    //     .then(response => {
    //       if (response.data==="user registered sucessfully") {
    //         console.log('registered successfully')
    //       } else if (response.data==='email already used'){
    //         console.log('email already used')
    //       }
    //       else {console.log(response.data)}
    //     })


    // }else{
    //   console.log(this.state)
    //   console.error('Invalid Form')
    // }
    console.log('submitted!!')
  }


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


  handleChangeSave = input => e => {
    this.setState({ [input]: e.target.value });
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
      switch (input) {

        case "employing_Authority":
          formErrors.DOB =
          value.length =0 ? "This field is required. Please return and fill this out. " : ""
        break;

        case "nationality":
            formErrors.DOB =
            value.length =0 ? "This field is required. Please return and fill this out. " : ""
          break;

  }
  this.setState({ formErrors, [name]: value });
  }

  render() {
    const { prev_appt, nationality, application_type, step, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, gender,formErrors} = this.state;
    const values = {prev_appt, nationality, application_type, step, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, gender,formErrors};

    switch (step) {
      case 1:
        return (
          <PersonalInfo
            nextStep={this.nextStep}
            handleChangeSave={this.handleChangeSave}
            nextStep = {this.nextStep}
            values={values}
          />
          );
      case 2:
          return (
            <TeacherInfo
              nextStep={this.nextStep}
              handleChangeSave={this.handleChangeSave}
              prevStep={this.prevStep}
              values={values}
            />);
      case 3:
        return (
          <ShortAnswer
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChangeSave={this.handleChangeSave}
            values={values}
          />
        );
      case 4:
          return (
            <Submit
              prevStep={this.prevStep}
              submit = {this.submit}
              values={values}
            />);    }
  }
};




const SideWrapper = styled(Wrapper)`
width: 100%;
display:inline-block;
padding-top: 1%;
margin: 0px;
`

const Menu = styled.div`
display: inline-block;
width: 23%;
text-align: left;
border-radius: 3px;
margin: 1%;
vertical-align: top;
max-width: 100%;
`
const View = styled.div`
display: inline-block;
text-align: left;
width: 74%;
border-radius: 3px;
margin: 1% 1% 0 0 ;
max-width: 100%;
`
const Form = styled(FormWrapper)`
max-width: 100%;`