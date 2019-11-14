import React, { Component } from "react";
import {Wrapper, FormWrapper,} from '../../constants/utils/Styling.jsx'
import {AppType, PersonalInfo, TeacherInfo, ShortAnswer, Attachments, Submit} from "./ApplicationInfo.jsx"
import styled from "styled-components";

export default class Application extends Component {
  constructor(props) {
    super(props);
    const user = props.user
    this.state = {
      step: 0,
      application_id: null,
      application_type: null,
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
      first_name:user.first_name,
      last_name:user.last_name,
      email:user.email,
      sex: user.gender,
};
  }

  submit = (event) => {
    event.preventDefault();

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

    console.log('submitted!!')
  }


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
  }


  render() {
    const { prev_appt, nationality, application_type, step, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex} = this.state;
    const values = {prev_appt, nationality, application_type, step, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex};
    switch (step) {
      case 0: 
        return (
          <AppType 
          nextStep={this.nextStep}
          handleChangeSave={this.handleChangeSave}
          nextStep = {this.nextStep}
          values={values}
          />
        )
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
            <Attachments
              prevStep={this.prevStep}
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />);    
      case 5:
        return (
          <Submit
            prevStep={this.prevStep}
            submit = {this.submit}
            values={values}
          />);    
          
          
          }
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