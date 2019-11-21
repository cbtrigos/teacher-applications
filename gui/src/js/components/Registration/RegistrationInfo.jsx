import React, { Component } from "react";
import {H1, Wrapper, Buttons, Notification, Left, FormWrapper,  Input, Label, New, ErrorMessage, CreateButton, A_center} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';


// The "Personal Details" page is the 1st panel of the registration 
export class FormUserDetails extends Component {
  render() {
    const { values, handleChangeSave, submit, validateForm } = this.props;
        return (
            <Wrapper>
            <FormWrapper>
              <H1>Registration</H1>
              {values.serverMessage!==null && <Notification>{values.serverMessage}</Notification>}
                <Buttons> 
                <Left>
                    <Label htmlFor="firstName"> First Name</Label>
                        <Input
                            type = "text"
                            className=""
                            // placeholder="First Name"
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
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type = "text"
                        className=""
                        // placeholder="Last Name"
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
                    <Label htmlFor="email">Email </Label>
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
                    <Label htmlFor="mobile_number"> Mobile Number</Label>
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
                  <Label htmlFor="Gender">Gender </Label>
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
                    <Label htmlFor="DOB"> Date of Birth</Label>
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
                    <Label htmlFor="password1"> Password</Label>
                    <Input
                        className=""
                        // placeholder="Password"
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