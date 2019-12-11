import React, { Component } from "react";
import {H1, H2, Wrapper, Buttons, TextArea, Partition, Tooltip, InfoIcon, TooltipText, Field, Notification, Left, FormWrapper,  Input, Label, New, ErrorMessage, CreateButton, A_center} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"
import { CircularProgress } from '@material-ui/core';

export function Info(title) {
    event.preventDefault();
  
    return (
      <Tooltip> 
        <InfoIcon/>
        <TooltipText>{title}</TooltipText>
      </Tooltip>
    );
  }
export default class ApproverRegister extends Component {
  render() {
    const { values, handleChangeSave, submit, validateForm, step, toolTip } = this.props;
        return (
            <Wrapper>
            <FormWrapper>
              <H1>Approver Registration</H1>
              <H2>For Education Secretaries, School proprietors, TSC management members, and Chairmen representing a school's Board of Governors.</H2> 
              <A_center H2 onClick={step('Clear')}>Looking for the applicant registration? Go here! </A_center><br/>

              {values.serverMessage==='loading' 
                  ?   <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div>
                  : values.serverMessage!==null && <Notification>{this.state.error}</Notification>}


             
              <Partition style={{padding: '3%'}}>
                  <H1>Approval Request Information</H1>
                  <New>
                      <Label htmlFor="approver_type">Approval Request Type *
                      {Info(toolTip.approver_type)}
                      </Label>
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px", padding: '0', margin: '0 0 20px 0' }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={values.approver_type}
                                  defaultValue={values.approver_type}
                                  onChange={handleChangeSave('approver_type')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={"District Education Secretary"}><H2 left small>District Education Secretary</H2></MenuItem>
                                  <MenuItem value={"Chairman for a school's Board of Governors"}><H2 left small>Chairman for a school's Board of Governors</H2></MenuItem>
                                  <MenuItem value={"TSC Teacher Management Department"}><H2 left small>TSC Teacher Management Representative</H2></MenuItem>
                                  <MenuItem value={"TSC Chair"}><H2 left small>TSC Chair</H2></MenuItem>
                                  <MenuItem value={"Master"}><H2 left small >Master User</H2></MenuItem>
                                  <MenuItem value={"Other"}><H2 left small >Other (will elaborate below)</H2></MenuItem>

                             </Select>
                              </FormControl>
                  </New>
                  <New>
                    <Label htmlFor="email">Title * {Info(toolTip.title)}
                    </Label>
                    <Field
                        type = "text"
                        name="title"
                        noValidate
                        onChange={handleChangeSave('title')}
                        defaultValue={values.title}
                        />
                 <ErrorMessage>{values.formErrors.title}</ErrorMessage>
                </New>
                <New>
                    <Label htmlFor="school_name">School Name * {Info(toolTip.school_name)}

                    </Label>
                    <Field
                        type = "text"
                        name="school_name"
                        noValidate
                        onChange={handleChangeSave('school_name')}
                        defaultValue={values.school_name}
                        />
                 <ErrorMessage>{values.formErrors.school_name}</ErrorMessage>
                </New>
                <New>
                      <Label htmlFor="school_district">School District *
                      {Info(toolTip.school_district)}
                      </Label>
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px", padding: '0', margin: '0 0 20px 0' }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={values.school_district}
                                  defaultValue={values.school_district}
                                  onChange={handleChangeSave('school_district')}
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
                    <Label htmlFor="emis_code">EMIS Code * {Info(toolTip.emis_code)}
                    </Label>
                    <Field
                        type = "number"
                        name="emis_code"
                        noValidate
                        onChange={handleChangeSave('emis_code')}
                        defaultValue={values.emis_code}
                        />
                 <ErrorMessage>{values.formErrors.emis_code}</ErrorMessage>
                </New>
                <New>
                    <Label htmlFor="additional_info"> Additional Info {Info(toolTip.additional_info)}</Label>

                        <TextArea
                            type = "text"
                            name='additional_info'
                            noValidate
                            onChange={handleChangeSave('additional_info')}
                            defaultValue={values.additional_info}
                            />
                </New>
                </Partition>

                <Partition  style={{padding: '3%'}}>
                  <H1> Personal Account Information</H1>
                <Buttons> 
                <Left>
                    <Label htmlFor="firstName">First Name *</Label>
                        <Field
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
                    <Field
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
                    <Field
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
                <New> <br/>
                    <Label htmlFor="DOB"> Date of Birth *</Label>
                        <Field
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
                    <Field
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
                    <Label htmlFor="password2"> Password Confirmation</Label>
                    <Field
                        className=""
                        // placeholder="Password"
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

                </Partition>
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