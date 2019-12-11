import React, { Component } from "react";
import {H1, H2, Wrapper, Buttons,  Notification, Left, FormWrapper,  Input, Label, New, ErrorMessage, CreateButton, A_center} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';
import { CircularProgress } from '@material-ui/core';
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"


// The "Personal Details" page is the 1st panel of the registration 
export default class ApplicantRegister extends Component {
  render() {
    const { values, handleChangeSave, submit, validateForm, step } = this.props;
        return (
            <Wrapper>
            <FormWrapper>
              <H1>Applicant Registration</H1>
              <H2>For prospective primary, secondary, and vocational school teachers</H2> 
              {/* <A_center H2 onClick={step('Clear')}>Looking for the approver registration? Go here! </A_center><br/> */}



              {values.serverMessage==='loading' 
                  ?   <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div>
                  : values.serverMessage!==null && <Notification>{values.serverMessage}</Notification>}


                <New>
                    <Label htmlFor="to_create_listing">User Type *</Label>
                    <FormControl variant="outlined" style={{ width: "100%", height: "45px", padding: '0', margin: '0 0 20px 0' }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={values.to_create_listing}
                                  defaultValue={values.to_create_listing}
                                  onChange={handleChangeSave('to_create_listing')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"I wish to apply for a teacher position"}><H2 left small >I wish to apply for a teacher position</H2></MenuItem>
                                  <MenuItem value={"I wish to submit a job listing"}><H2 left small>I wish to submit a job listing</H2></MenuItem>
                                  </Select>
                              </FormControl>
 
                </New>
                <Buttons> 
                <Left>
                    <Label htmlFor="firstName"> First Name *</Label>
                        <Input
                            type = "text"
                            className=""
                            name='firstName'
                            noValidate
                            onChange={handleChangeSave('firstName') }
                            defaultValue={values.firstName}
                            />
                        {values.formErrors.firstName.length > 0 && (
                <ErrorMessage>{values.formErrors.firstName}</ErrorMessage>
              )} 
                </Left>
                <New>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                        type = "text"
                        className=""
                        name='lastName'
                        noValidate
                        onChange={handleChangeSave('lastName') }
                        defaultValue={values.lastName}

                        />
                    {values.formErrors.lastName.length > 0 && (
                    <ErrorMessage>{values.formErrors.lastName}</ErrorMessage>
                )}
                </New> 
                </Buttons>
                <New>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        type = "text"
                        name="email"
                        noValidate
                        onChange={handleChangeSave('email')}
                        defaultValue={values.email}
                        />
                 <ErrorMessage>{values.formErrors.email}</ErrorMessage>
                </New>
                <New>
                    <Label htmlFor="mobile_number"> Mobile Number *</Label>
                      <NumberFormat 
                          customInput={Input} 
                          format="+232 ## ######" 
                          name="mobile_number"
                          mask="*"
                          value={values.mobile_number} 
                          onChange={handleChangeSave('mobile_number')}
                          />
                  <ErrorMessage>{values.formErrors.mobile_number}</ErrorMessage>

                </New>

                <New> 
                  <Label htmlFor="Gender">Gender *</Label>
              <Buttons props={'center'}>
              <FlexContainer>
                  <RadioButton
                    type="radio"
                    name="radio"
                    value="Female"
                    checked={values.gender === "Female"}
                    onChange={handleChangeSave('gender')}/>
                  <Label gender>Female</Label>
                </FlexContainer>

                <FlexContainer>
                  <RadioButton
                    type="radio"
                    name="radio"
                    value="Male"
                    checked={values.gender === "Male"}
                    onChange={handleChangeSave('gender')}/>
                  <Label gender>Male</Label>
                </FlexContainer>

                <FlexContainer>
                  <RadioButton
                    type="radio"
                    name="radio"
                    value="Nonbinary"
                    checked={values.gender === "Nonbinary"}
                    onChange={handleChangeSave('gender')}/>
                  <Label gender>Nonbinary</Label>
                </FlexContainer>
                  </Buttons>
                </New>

                <New>
                    <Label htmlFor="DOB"> Date of Birth *</Label>
                        <Input
                            type = "date"
                            className=""
                            placeholder="MM/DD/YYYY"
                            name='DOB'
                            noValidate
                            onChange={handleChangeSave('DOB')}
                            defaultValue={values.DOB}
                            />
                <ErrorMessage>{values.formErrors.DOB}</ErrorMessage>
                </New>

                <New>
                    <Label htmlFor="password1"> Password *</Label>
                    <Input
                        className=""
                        type="password"
                        name="password1"
                        noValidate
                        onChange={handleChangeSave('password1')}
                        defaultValue={values.password1}

                        />
                <ErrorMessage>{values.formErrors.password1}</ErrorMessage>
                </New>
                <New>
                    <Label htmlFor="password2"> Password Confirmation *</Label>
                    <Input
                        className=""
                        type="password"
                        name="password2"
                        noValidate
                        onChange={handleChangeSave('password2')}
                        defaultValue={values.password2}
                        /> 

                    {values.formErrors.password2.length > 0 && (
                <ErrorMessage>{values.formErrors.password2}</ErrorMessage>
              )}
                </New>
                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={submit}
                disabled={!validateForm()}
              >Create Account</CreateButton> 
              <A_center href="/login"> Have an account? Sign in here! </A_center>
            </FormWrapper>

            </Wrapper>
            );

    };
};



const Div = styled.div`
margin: 13px;`

const Category= styled.div`
background-color: lightgrey;
font: inherit;`

const It= styled.h2`
font: inherit;
text-style: italic`


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