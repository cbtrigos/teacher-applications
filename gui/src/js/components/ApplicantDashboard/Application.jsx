import React, { Component } from "react";
import {Wrapper, FormWrapper,} from '../../constants/utils/Styling.jsx'
import {AppType, PersonalInfo, TeacherInfo, ShortAnswer, Attachments, Submit, Completed} from "./ApplicationInfo.jsx"
import styled from "styled-components";
import axios from 'axios';
// import {format} from "react-phone-input-auto-format";

export default class Application extends Component {
  constructor(props) {
    super(props);
    console.log('here are the props', props)
    const user = props.user
    this.state = {
      step: 0,
      submitOkay:false, 
      errors: '',
      checkMark: false, 
      application: {
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
        last_edited: null,
        submitted: null,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        applicant_id: user.applicant_id,
        sex:user.gender,
      }
      
};
 }

  submit = (event) => {
    const { step } = this.state;
    event.preventDefault();
      axios 
        .post('http://localhost:5000/api/submit-application', 
          {"application_id": this.state.application.application_id
        }) 
        .then(response => {
          if (response.data==="application submitted successfully") {
            this.setState({
              step: step + 1, 
            });
          } else {console.log(response.data)}
        })
      
  }

  async componentDidMount() {
    const app = this.props.application
    if (this.props.application!==undefined) {
      this.setState({
        application: app,
        step:1,
      })
      console.log('COMPONENT MOUNTING.')
      console.log('COMPONENT props.user: ',this.props.user)
      console.log('COMPONENT props.application: ', this.props.application)
      console.log('now the application state is:', this.state)

    }
    else {
      console.log('COMPONENT MOUNTING. this.props.application is undefined')
    }
  }

  validateForm = () => {
    let valid = true;
    Object.values(this.state.formErrors).forEach(
      (e) => e.length > 0 && (valid = false)
    );
    Object.values(this.state.application).forEach(
      (val) => val === '' && (valid = false)
    );
    return valid;
  }


  step = val => e => {
    let k = 0
    if (val==='exit') {
      //push to dashboard 
    }
    else{
      if (val==='next') {k=1}
      else if (val==='prev') {k=-1}
      const { step } = this.state;
      this.setState({
        step: step + k
      });
    }
    axios 
    .post('http://localhost:5000/api/save-application', 
      this.state.application) 
    .then(response => {
      if (response.data==="application updated sucessfully") {
          console.log('app updated successfully')
        }
      else {console.log(response.data)}
    })
  };

  handleCheckboxChange = name => event => {
    this.setState({ checkMark: event.target.checked })
  }

  beginApp = () => e => {
    axios 
      .post('http://localhost:5000/api/begin-application', 
        {"email": this.state.application.email,
          "sex": this.state.application.sex, 
          "first_name": this.state.application.first_name, 
          "last_name": this.state.application.last_name, 
          "application_type": this.state.application.application_type,
          "applicant_id": this.props.user.id
      }) 
      .then(response => {
        if (response.data.message==="application registered sucessfully") {
          const { step } = this.state;
          this.setState({
            step: step + 1, 
            application_id: response.data.application_id,
            created: response.data.created
          });
        }
        else {console.log(response.data)}
      })

  };
  onChangePhone = phoneNumber => e =>{
  // const formatted = format(phoneNumber); // (123) 456-7890
    this.setState({
      mobile_number: phoneNumber
    })
  };

  handleChangeSave = input => e => {
    const value = e.target.value
    this.setState(prevState => ({
      application: {                 
          ...prevState.application, 
          [input]: value    
      }
  }))
  console.log(this.state.application)
  }


  render() {
    const { prev_appt, nationality, application_type, application_id, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex} = this.state.application;
    const { step } = this.state
    const values = { prev_appt, application_id, nationality, application_type, last_name, employing_authority, first_name, other_names, mobile_number, pin_code, nassit, qualifications, special_skills, sex};
    switch (step) {
      case 0: 
        return (
          <AppType 
          beginApp={this.beginApp}
          handleChangeSave={this.handleChangeSave}
          values={values}
          />
        )
      case 1:
        return (
          <PersonalInfo
            step={this.step}
            onChangePhone = {this.onChangePhone}
            handleChangeSave={this.handleChangeSave}
            values={values}
          />
          );
      case 2:
          return (
            <TeacherInfo
              step={this.step}
              handleChangeSave={this.handleChangeSave}
              values={values}
            />);
      case 3:
        return (
          <ShortAnswer
            step={this.step}
            handleChangeSave={this.handleChangeSave}
            values={values}
          />
        );
      case 4:
          return (
            <Attachments
              step={this.step}
              values={values}
            />);    
      case 5:
        return (
          <Submit
            step={this.step}
            submit = {this.submit}
            values={values}
            checkmarked = {this.state.checkMark}
            handleCheckboxChange = {this.handleCheckboxChange}
            errors = {this.state.errors}
          />); 
      case 6:
        return (
          <Completed
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