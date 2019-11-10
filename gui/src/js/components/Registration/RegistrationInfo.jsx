import React, { Component } from "react";
import {H1, Wrapper, SharedNew, Buttons, Button, Left, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton, A_center} from '../Styling.jsx'
import styled from 'styled-components'


// The "Personal Details" page is the 1st panel of the registration 
export class FormUserDetails extends Component {
  render() {
    const { values, handleChangeSave, nextStep, checkForm, submit } = this.props;
        return (
            <Wrapper>
            <FormWrapper>
              <H1>Registration</H1>
                <Buttons> 
                <Left>
                    <Label htmlFor="firstName"> First Name</Label>
                        <Input
                            type = "text"
                            className=""
                            placeholder="First Name"
                            name='firstName'
                            noValidate
                            onChange={handleChangeSave('firstName') }
                            defaultValue={values.firstName}
                            />
                        {values.formErrors.firstName.length > 0 && (
                <ErrorMessage>{values.formErrors.firstName}</ErrorMessage>
              )} 
                </Left>
                <SharedNew>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type = "text"
                        className=""
                        placeholder="Last Name"
                        name='lastName'
                        noValidate
                        onChange={handleChangeSave('lastName') }
                        defaultValue={values.lastName}

                        />
                    {values.formErrors.lastName.length > 0 && (
                    <ErrorMessage>{values.formErrors.lastName}</ErrorMessage>
                )}
                </SharedNew> 
                </Buttons>
                <New>
                    <Label htmlFor="email">Email </Label>
                    <Input
                        type = "text"
                        placeholder="email"
                        name="email"
                        noValidate
                        onChange={handleChangeSave('email')}
                        defaultValue={values.email}
                        />
                 <ErrorMessage>{values.formErrors.email}</ErrorMessage>
                </New>

                <New> 
                  <Label htmlFor="Gender">Gender </Label>
                  <CForm> 
                      <Label>
                        <Button
                          type="radio"
                          value="female"
                          onClick={handleChangeSave('gender') }
                          checked={values.gender === "female"}
                        />
                        Female
                      </Label>
                      <Label>
                        <Button
                          type="radio"
                          value="male"
                          onClick={handleChangeSave('gender') }
                          checked={values.gender === "male"}
                        />
                        Male
                      </Label>
                      <Label>
                        <Button
                          type="radio"
                          value="other"
                          onChange={handleChangeSave('gender') }
                          checked={values.gender === "other"}
                        /> Other</Label>
                  </CForm>
                </New>

                <New>
                    <Label htmlFor="DOB"> Date of Birth</Label>

                        <Input
                            type = "date"
                            className=""
                            placeholder="Date of Birth"
                            name='DOB'
                            noValidate
                            onChange={handleChangeSave('DOB')}
                            defaultValue={values.DOB}

                            />
                  
                <ErrorMessage>{values.formErrors.DOB}</ErrorMessage>
                </New>

                <New>
                    <Label htmlFor="password1"> Password</Label>
                    <Input
                        className=""
                        placeholder="Password"
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
                    <Input
                        className=""
                        placeholder="Password"
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
              >Create Account</CreateButton> 
              <A_center href="/login"> Have an account? Sign in here! </A_center>
            </FormWrapper>

            </Wrapper>
            );

    };
};


// The "Confirm" page is the 3rd panel of the registration 
export class Submit extends Component {
  render() {
    const { values, handleChangeSave, nextStep, prevStep } = this.props;

    return (
          <Wrapper>
            <FormWrapper>
              <H1>Registration</H1>
                <h2>3/3: Confirm User Details</h2>
            <br />
            <Div>
              <Category> First Name: </Category> <It> {values.firstName} </It>
            </Div>
            <Div>
            <Category> Last Name: </Category><It> {values.lastName} </It>
            </Div>
            <Div>
            <Category> Email: </Category><It> {values.email} </It>
            </Div>
            <Div>
            <Category> DOB: </Category><It> {values.DOB} </It>
            </Div>
            <Div>
            </Div> 
          <br />
        <Buttons>
          <Left> 
          <CreateButton
            color="secondary"
            variant="contained"
            onClick={prevStep}
          >Back</CreateButton>
          </Left>
          <CreateButton
            color="primary"
            variant="contained"
            onClick={nextStep}
          >Confirm & Continue</CreateButton>
          </Buttons>
          </FormWrapper>
          </Wrapper>
    );
  }
}



const CForm = styled.div`
  display: -webkit-flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 5px;
`
const Div = styled.div`
margin: 13px;`

const Category= styled.div`
background-color: lightgrey;
font: inherit;`

const It= styled.h2`
font: inherit;
text-style: italic`