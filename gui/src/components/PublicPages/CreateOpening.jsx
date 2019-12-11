import React, { Component } from "react";
import {H1, H2, InputLarge, Wrapper, Buttons, Notification, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton, A_center, HorizSeparator} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

// The "Personal Details" page is the 1st panel of the registration 
export default class CreateOpening extends Component {
    constructor(props) {
        super(props);
        this.state = {
          step: 0,
          user: props.user, 
          serverMessage: null, 
          submission: {
            title: '',
            name_title: '', 
            first_name: '', 
            last_name: '', 
            email: '', 
            mobile_number: '', 
            DOB: '', 
            additional_info: '-',

            school: '',
            school_type: '',
            emis_code: '',
            title_proposed_appt: '',
            date_proposed_appt: '',
            reasons_proposed_appt: '',
            pupil_enrollment: '',
            number_of_teachers: '',
            on_payroll: '',
            tq_JSS: null,
            tq_SSS: null,
            tq_vocational: null,
            tq_primary: null,
            grade_requested: '',
            district: '',
            qualifications_required: '-'
          },
          formErrors: {
            first_name: '',
            last_name: '',
            email: '',
            mobile_number: '',
            date_proposed_appt: '',
            DOB: '',
            title: '',
            school_district: '',
            approver_type: '',
            additional_info: '',
            school_name: '',
            emis_code: '',
          },
        };
        this.handleChangeSave = this.handleChangeSave.bind(this)
      };

      submit = () => e => {
        event.preventDefault();
        this.setState({
            serverMessage: 'loading',
            step:1
        })
        axios 
        .post('http://localhost:5000/api/new_job_opening', 
            this.state.submission) 
        .then(response => {
            if (response.data==="Job Opening submitted sucessfully") {
            this.setState({
                serverMessage: response.data,
                step: 2
            })
            }
        })
    }

    handleChangeSave = input => e => {
        const value = e.target.value
        this.setState(prevState => ({
            submission: {                 
                ...prevState.submission, 
                [input]: value    
            }
            }))
        const { name} = e.target;
        let formErrors = { ...this.state.formErrors };
            switch (input) {
            case "first_name":
                formErrors.first_name =
                value.length < 2 ? "minimum 2 characters required" : "";
            break;
            case "last_name":
                formErrors.last_name =
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
            case "DOB":
                formErrors.DOB =
                value.length < 10 ? "date not valid" : ""
            break;
            case "emis_code":
                formErrors.emis_code =
                value.length !== 9 ? "emis code not valid" : ""
            break;
            case "date_proposed_appt":
                const today = new Date()
                const given = new Date(value)
                formErrors.date_proposed_appt =
                given<today ? "choose a future date" : ""
            break;
        }
        this.setState({ formErrors });
    }

    validateForm = () => {
      let valid = true;
      Object.values(this.state.formErrors).forEach(
          (e) => e.length > 0 && (valid = false)
      );
      Object.values(this.state.submission).forEach(
          (val) => 
          val === '' && (valid = false)
          );
      return valid;
    }
      


  render() {
    console.log(this.props)
      const {submission, formErrors} = this.state
      const {school_type} = submission
        return (
            <Wrapper>
      {this.state.step===2 && 
      <FormWrapper>
        <H1>{this.state.serverMessage}</H1>

        {this.state.serverMessage==="Job Opening submitted sucessfully" && 
        <H2>
          Your submission has been received.<br/>
          You will receive a confirmation email of submission, and we will let you know soon if it was approved or rejected.<br/>
          <br/>
          Thank you!</H2>}


      </FormWrapper>}
        {this.state.step===1 && 
        <FormWrapper>
          <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div>
          <H2>
          Please be patient. Your submission is being submitted... 
            
            </H2>

        </FormWrapper>
      }
      {(this.state.step===0 && (this.props.user===undefined || (this.props.user.user_type!==4 && this.props.user.user_type!==5))) &&
      <FormWrapper>
        <H1>Further Steps Required</H1>
        {Object.keys(this.props.user).length===0
          ? <H2>It looks like you're not logged in. In order to submit a job opening request, please make an account and indicate that it's to post a job listing. <br/><br/>Upon submission, we verify credentials to ensure you are authorized to post a listing.<br/><br/>Thank you!</H2>
          : (this.props.user.user_type!==4 && this.props.user.user_type!==5) && <H2>It looks like you're logged in as a user that cannot submit job opening requests. In order to submit a job opening request, please make a new account and indicate that it's to post a job listing. <br/><br/>Upon submission, we verify credentials to ensure you are authorized to post a listing.<br/><br/>Thank you!</H2>}
      <A_center href="/register">Create a new account here</A_center>
      </FormWrapper>
      }
      {(this.state.step===0 && this.props.user!==undefined && (this.props.user.user_type===4 || this.props.user.user_type===5)) &&  <FormWrapper>
              <H1>Job Opening Submission</H1>
              <H2>For school proprietors and school boards of governors</H2> 
              {this.state.serverMessage!==null && <Notification>{this.state.serverMessage}</Notification>}
                <HorizSeparator/>
                  <H2>School Information</H2>
                  <New>
                    <Label htmlFor="school">School Name *</Label>
                    <Input
                        type = "text"
                        name="school"
                        noValidate
                        onChange={this.handleChangeSave('school')}
                        defaultValue={submission.school}
                        />
                {formErrors.school!=='' && <ErrorMessage>{formErrors.school}</ErrorMessage>}
                </New>
                <New>
                      <Label htmlFor="school_type">School Type *
                      </Label>
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px" }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={submission.school_type}
                                  defaultValue={submission.school_type}
                                  onChange={this.handleChangeSave('school_type')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"Vocational"}><H2 left small>Vocational</H2></MenuItem>
                                  <MenuItem value={"Primary"}><H2 left small>Primary</H2></MenuItem>
                                  <MenuItem value={"Secondary"}><H2 left small>Secondary</H2></MenuItem>
                                </Select>
                              </FormControl>
                  </New>
                <New>
                    <Label htmlFor="emis_code">EMIS Code *</Label>
                    <Input
                        type = "number"
                        name="emis_code"
                        noValidate
                        onChange={this.handleChangeSave('emis_code')}
                        defaultValue={submission.emis_code}
                        />
                 {formErrors.emis_code!=='' &&<ErrorMessage>{formErrors.emis_code}</ErrorMessage>}
                </New>
                <New>
                    <Label htmlFor="district">District*</Label>
                    <FormControl variant="outlined" style={{ width: "100%", height: "45px", padding: '0', margin: '0 0 20px 0' }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={submission.district}
                                  defaultValue={submission.district}
                                  onChange={this.handleChangeSave('district')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"Kenema"}><H2 left small >Kenema</H2></MenuItem>
                                  <MenuItem value={"Kailahun"}><H2 left small>Kailahun</H2></MenuItem>
                                  <MenuItem value={"Kono"}><H2 left small>Kono</H2></MenuItem>
                                  <MenuItem value={"Bombali"}><H2 left small>Bombali</H2></MenuItem>
                                  <MenuItem value={"Falaba"}><H2 left small>Falaba</H2></MenuItem>
                                  <MenuItem value={"Karene"}><H2 left small>Karene</H2></MenuItem>
                                  <MenuItem value={"Kambia"}><H2 left small>Kambia</H2></MenuItem>
                                  <MenuItem value={"Koinadugu"}><H2 left small>Koinadugu</H2></MenuItem>
                                  <MenuItem value={"Port Loko"}><H2 left small>Port Loko</H2></MenuItem>
                                  <MenuItem value={"Tonkolili"}><H2 left small>Tonkolili</H2></MenuItem>
                                  <MenuItem value={"Bo"}><H2 left small>Bo</H2></MenuItem>
                                  <MenuItem value={"Bonthe"}><H2 left small>Bonthe</H2></MenuItem>
                                  <MenuItem value={"Moyamba"}><H2 left small>Moyamba</H2></MenuItem>
                                  <MenuItem value={"Pujehun"}><H2 left small>Pujehun</H2></MenuItem>
                                  <MenuItem value={"Western Area Rural"}><H2 left small>Western Area Rural</H2></MenuItem>
                                  <MenuItem value={"Western Area Urban"}><H2 left small>Western Area Urban</H2></MenuItem> 
                                </Select>
                              </FormControl>
                </New>
  
                  <New>
                    <Label htmlFor="pupil_enrollment">Total Number of Pupils Enrolled *</Label>
                    <Input
                        type = "number"
                        name="pupil_enrollment"
                        noValidate
                        onChange={this.handleChangeSave('pupil_enrollment')}
                        defaultValue={submission.pupil_enrollment}
                        />
                </New>
                <New>
                    <Label htmlFor="number_of_teachers">Total Number of Teachers *</Label>
                    <Input
                        type = "number"
                        name="number_of_teachers"
                        noValidate
                        onChange={this.handleChangeSave('number_of_teachers')}
                        defaultValue={submission.number_of_teachers}
                        />
                </New>
                <New>
                    <Label htmlFor="on_payroll">Total Number of Teachers on Payroll *</Label>
                    <Input
                        type = "number"
                        name="on_payroll"
                        noValidate
                        onChange={this.handleChangeSave('on_payroll')}
                        defaultValue={submission.on_payroll}
                        />
                </New>
                {school_type==='Secondary' &&
                    <>
                  <New>
                    <Label htmlFor="tq_JSS">Number of Trained and Qualified (TQ) Teachers for JSS Level *</Label>
                    <Input
                        type = "number"
                        name="tq_JSS"
                        noValidate
                        onChange={this.handleChangeSave('tq_JSS')}
                        defaultValue={submission.tq_JSS}
                        />
                </New>
                <New>
                    <Label htmlFor="tq_SSS">Number of Trained and Qualified (TQ) Teachers for SSS Level *</Label>
                    <Input
                        type = "number"
                        name="tq_SSS"
                        noValidate
                        onChange={this.handleChangeSave('tq_SSS')}
                        defaultValue={submission.tq_SSS}
                        />
                </New>
                </>
                }
                {school_type==='Primary' &&
                  <New>
                    <Label htmlFor="tq_primary">Number of Trained and Qualified (TQ) Teachers for Primary Level *</Label>
                    <Input
                        type = "number"
                        name="tq_primary"
                        noValidate
                        onChange={this.handleChangeSave('tq_primary')}
                        defaultValue={submission.tq_primary}
                        />
                </New>
                }
               {school_type==='Vocational' &&
                  <New>
                    <Label htmlFor="tq_vocational">Number of Trained and Qualified (TQ) Teachers for Vocational Level *</Label>
                    <Input
                        type = "number"
                        name = "tq_vocational"
                        noValidate
                        onChange={this.handleChangeSave('tq_vocational')}
                        defaultValue={submission.tq_vocational}
                        />
                </New>
                }
                <New>
                    <Label htmlFor="title_proposed_appt">Job Title for the Proposed Appointment *</Label>
                    <Input
                        type = "text"
                        name="title_proposed_appt"
                        noValidate
                        onChange={this.handleChangeSave('title_proposed_appt')}
                        defaultValue={submission.title_proposed_appt}
                        />
                 {formErrors.title_proposed_appt!=='' &&<ErrorMessage>{formErrors.title_proposed_appt}</ErrorMessage>}
                </New>
                <New>
                    <Label htmlFor="date_proposed_appt">Start Date for the Proposed Appointment *</Label>
                    <Input
                        type = "date"
                        name="date_proposed_appt"
                        noValidate
                        onChange={this.handleChangeSave('date_proposed_appt')}
                        defaultValue={submission.date_proposed_appt}
                        />
                </New>
                <New>
                    <Label htmlFor="reasons_proposed_appt">Reasons for the Proposed Appointment *</Label>
                    <Input
                        type = "text"
                        name="reasons_proposed_appt"
                        noValidate
                        onChange={this.handleChangeSave('reasons_proposed_appt')}
                        defaultValue={submission.reasons_proposed_appt}
                        />
                </New>   
                <New>
                    <Label htmlFor="grade_requested">Grade Requested*</Label>
                     <Input
                        type = "text"
                        name="grade_requested"
                        noValidate
                        onChange={this.handleChangeSave('grade_requested')}
                        defaultValue={submission.grade_requested}
                        />
                </New>
              <New>
                    <Label htmlFor="qualifications_required">Minimum Qualifications for the Appointment</Label>
                    <FormControl variant="outlined" style={{ width: "100%", height: "45px" }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={submission.qualifications_required}
                                  defaultValue={submission.qualifications_required}
                                  onChange={this.handleChangeSave('qualifications_required')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"-"}><H2 left small >None</H2></MenuItem>
                                  <MenuItem value={"Teachers Certificate Lower (TCL)"}><H2 left small>Teachers Certificate Lower (TCL)</H2></MenuItem>
                                  <MenuItem value={"Teachers Certificate (TC)"}><H2 left small>Teachers Certificate (TC)</H2></MenuItem>
                                  <MenuItem value={"Higher Teachers Certificate (HTC) Primary or Secondary"}><H2 left small>Higher Teachers Certificate (HTC) Primary or Secondary</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Science or Arts (B.Sc./B.A.) Hons or Gen"}><H2 left small>Bachelors of Science or Arts (B.Sc./B.A.) Hons or Gen</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Education"}><H2 left small>Bachelors of Education</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Science or Arts in Education"}><H2 left small>Bachelors of Science or Arts in Education</H2></MenuItem>
                                  <MenuItem value={"Masters in Education or a Higher Degree"}><H2 left small>Masters in Education or a Higher Degree</H2></MenuItem>
                                 </Select>
                              </FormControl>
                </New>
                <br/><br/>
                <HorizSeparator/>
                  <H2>Your Information</H2>
                  <New>
                    <Label htmlFor="title">Your Job Title Relevant to the School *</Label>
                    <Input
                        type = "text"
                        name='title'
                        noValidate
                        onChange={this.handleChangeSave('title') }
                        defaultValue={submission.title}

                        />
                </New> 
                <New>
                      <Label htmlFor="name_title">Name Title*
                      </Label>
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px", margin: '0 0 20px 0'  }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={submission.name_title}
                                  defaultValue={submission.name_title}
                                  onChange={this.handleChangeSave('name_title')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"Mr."}><H2 left small>Mr.</H2></MenuItem>
                                  <MenuItem value={"Mrs."}><H2 left small>Mrs</H2></MenuItem>
                                  <MenuItem value={"Miss."}><H2 left small>Miss.</H2></MenuItem>
                                  <MenuItem value={"Ms."}><H2 left small>Ms.</H2></MenuItem>
                                  <MenuItem value={"Dr."}><H2 left small>Dr.</H2></MenuItem>
                                  <MenuItem value={"Mx."}><H2 left small>Mx.</H2></MenuItem>
                                </Select>
                              </FormControl>
                  </New>
                <Buttons> 
                <Left>
                    <Label htmlFor="first_name"> First Name *</Label>
                        <Input
                            type = "text"
                            name='first_name'
                            noValidate
                            onChange={this.handleChangeSave('first_name')}
                            defaultValue={submission.first_name}
                            />
                        {formErrors.first_name.length > 0 && (
                <ErrorMessage>{formErrors.first_name}</ErrorMessage>
              )} 
                </Left>
                <New>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                        type = "text"
                        name='last_name'
                        noValidate
                        onChange={this.handleChangeSave('last_name') }
                        defaultValue={submission.last_name}

                        />
                    {formErrors.last_name.length > 0 && (
                    <ErrorMessage>{formErrors.last_name}</ErrorMessage>
                )}
                </New> 
                </Buttons>
                <New>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        type = "text"
                        name="email"
                        noValidate
                        onChange={this.handleChangeSave('email')}
                        defaultValue={submission.email}
                        />
                 <ErrorMessage>{formErrors.email}</ErrorMessage>
                </New>
                <New>
                    <Label htmlFor="mobile_number"> Mobile Number *</Label>
                      <NumberFormat 
                          customInput={Input} 
                          format="+232 ## ######" 
                          name="mobile_number"
                          mask="*"
                          value={submission.mobile_number} 
                          onChange={this.handleChangeSave('mobile_number')}
                          />
                  {formErrors.mobile_number!=='' &&<ErrorMessage>{formErrors.mobile_number}</ErrorMessage>}

                </New>
                <New>
                    <Label htmlFor="DOB"> Date of Birth *</Label>
                        <Input
                            type = "date"
                            className=""
                            placeholder="MM/DD/YYYY"
                            name='DOB'
                            noValidate
                            onChange={this.handleChangeSave('DOB')}
                            defaultValue={submission.DOB}
                            />
                {formErrors.DOB!=='' && <ErrorMessage>{formErrors.DOB}</ErrorMessage>}
                </New>
                <New>
                    <Label htmlFor="additional_info">Any Additional Relevant Information?</Label>
                     <InputLarge
                        type = "text"
                        name="additional_info"
                        noValidate
                        onChange={this.handleChangeSave('additional_info')}
                        defaultValue={submission.additional_info}
                        />
                </New>
                <br/>                <br/>
                <br/>

                {!this.validateForm() && <ErrorMessage>All fields are required</ErrorMessage>}
                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={this.submit()}
                disabled={!this.validateForm()}
              >Submit Listing for Approval</CreateButton> 
            </FormWrapper>
       }     </Wrapper>
            );

    };
};



const RadioButton = styled.input`
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover ~ ${RadioButton} {
    background: #bebebe;
  }
  &:checked + ${RadioButton} {
    background: #db7290;
    border: 1px solid #db7290;
    }
  }
`;

const FlexContainer = styled.div`
width: 20%;
text-align: center;
`