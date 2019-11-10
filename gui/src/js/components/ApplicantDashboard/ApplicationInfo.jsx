import React, { Component } from "react";
import {H1, TextArea, Wrapper, SharedNew, Buttons, Button, Left, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton, A_center} from '../Styling.jsx'
import styled from 'styled-components'


// The "Personal Details" page is the 1st panel of the registration 
export class PersonalInfo extends Component {
  render() {
    const { values, handleChangeSave, nextStep, checkForm } = this.props;
        return (
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
              <H2>{values.application_type} School </H2>
              <H2>Personal Information: Part 1/4</H2>
                <Buttons> 
                <Left>
                    <Label htmlFor="firstName"> First Name</Label>
                        <Input
                            type = "text"
                            className=""
                            placeholder="First Name"
                            name='first_name'
                            noValidate 
                            onChange={handleChangeSave('first_name') }
                            defaultValue={values.first_name} />
                           
                        {/* {values.formErrors.firstName.length > 0 && (
               <ErrorMessage>{values.formErrors.firstName}</ErrorMessage>
               )}  */}
                </Left>
                <SharedNew>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type = "text"
                        className=""
                        placeholder="Last Name"
                        name='last_name'
                        noValidate
                        onChange={handleChangeSave('last_name') }
                        defaultValue={values.last_name}

                        />
                    {/* {values.formErrors.lastName.length > 0 && (
                    <ErrorMessage>{values.formErrors.lastName}</ErrorMessage> */}
                {/* )} */}
                </SharedNew> 
                </Buttons>

                <New>
                    <Label htmlFor="other_names"> Other Names</Label>

                        <Input
                            type = "text"
                            placeholder="Other Names"
                            name='other_names'
                            noValidate
                            onChange={handleChangeSave('other_names')}
                            defaultValue={values.other_names}
                            />
                {/* <ErrorMessage>{values.formErrors.other_names}</ErrorMessage> */}
                </New>
                <New>
                    <Label htmlFor="mobile_number"> Mobile Number</Label>

                        <Input
                            type = "text"
                            placeholder="Mobile Number"
                            name='mobile_number'
                            noValidate
                            onChange={handleChangeSave('mobile_number')}
                            defaultValue={values.mobile_number}
                            />
                {/* <ErrorMessage>{values.formErrors.mobile_number}</ErrorMessage> */}
                </New>
                <New>
                    <Label htmlFor="gender"> Gender</Label>

                        <Input
                            type = "text"
                            placeholder="Gender"
                            name='gender'
                            noValidate
                            onChange={handleChangeSave('gender')}
                            defaultValue={values.gender}
                            />
                {/* <ErrorMessage>{values.formErrors.gender}</ErrorMessage> */}
                </New>
                <New>
                    <Label htmlFor="nationality"> Nationality</Label>

                        <Input
                            type = "text"
                            placeholder="Nationality"
                            name='nationality'
                            noValidate
                            onChange={handleChangeSave('nationality')}
                            defaultValue={values.nationality}
                            />
                {/* <ErrorMessage>{values.formErrors.nationality}</ErrorMessage> */}
                </New>

                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={nextStep}
              >Save and Continue</CreateButton> 
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class TeacherInfo extends Component {
    render() {
      const { values, handleChangeSave, nextStep, prevStep, checkForm } = this.props;
          return (
              <Wrapper>
               <FormWrapper>
               <H1>Teacher Application</H1>
              <H2>{values.application_type} School </H2>
                <H2>Teacher Information: Part 2/4</H2>
                  <Buttons> 
                
                  </Buttons>
                  <New>
                      <Label htmlFor="employing_authority">Employing authority </Label>
                      <Input
                          type = "text"
                          placeholder="Employing Authority"
                          name="employing_authority"
                          noValidate
                          onChange={handleChangeSave('employing_authority')}
                          defaultValue={values.employing_authority}
                          />
                   {/* <ErrorMessage>{values.formErrors.employing_authority}</ErrorMessage> */}
                  </New>
                  <New>
                      <Label htmlFor="pin_code"> Pin Code (if any)</Label>
  
                          <Input
                              type = "text"
                              placeholder="Pin code"
                              name='Pin Code'
                              noValidate
                              onChange={handleChangeSave('pin_code')}
                              defaultValue={values.pin_code}
                              />
                  {/* <ErrorMessage>{values.formErrors.pin_code}</ErrorMessage> */}
                  </New>
                  <New>
                      <Label htmlFor="nassit_number"> Nassit Number (if any)</Label>
  
                          <Input
                              type = "text"
                              placeholder="Nassit Number"
                              name='nassit_number'
                              noValidate
                              onChange={handleChangeSave('nassit_number')}
                              defaultValue={values.school_name}
                              />
                  {/* <ErrorMessage>{values.formErrors.school_name}</ErrorMessage> */}
                  </New>
                  
                  <New>
                      <Label htmlFor="prev_appt"> Previous appointment and Employing Authority (If any)</Label>
  
                          <Input
                              type = "text"
                              name='prev_appt'
                              noValidate
                              onChange={handleChangeSave('prev_appt')}
                              defaultValue={values.prev_appt}
                              />
                  {/* <ErrorMessage>{values.formErrors.prev_appt}</ErrorMessage> */}
                  </New>


                  <br/> <br/> 
                  <Buttons>
                <Left> 
                  <CreateButton
                    color="primary"
                    variant="contained"
                    onClick={prevStep}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={nextStep}
                >Save and Continue</CreateButton>
              </Buttons>
              </FormWrapper>
              </Wrapper>
  
              );
  
      };
  };
export class ShortAnswer extends Component {
  render() {
    const { values, handleChangeSave, nextStep, prevStep, checkForm } = this.props;
        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.application_type} School </H2>
              <H2>Short Answer: Part 3/4</H2>
                <New>
                    <Label htmlFor="nassit_number"> Qualifications (if any)</Label>

                        <TextArea
                            type = "text"
                            placeholder="Qualifications"
                            name='qualifications'
                            noValidate
                            onChange={handleChangeSave('qualifications')}
                            defaultValue={values.qualifications}
                            />
                {/* <ErrorMessage>{values.formErrors.qualifications}</ErrorMessage> */}
                </New>
                <New>
                    <Label htmlFor="special_skills"> Special Skills (if any)</Label>

                        <TextArea
                            type = "text"
                            placeholder="Special Skills"
                            name='special_skills'
                            noValidate
                            onChange={handleChangeSave('special_skills')}
                            defaultValue={values.special_skills}
                            />
                {/* <ErrorMessage>{values.formErrors.special_skills}</ErrorMessage> */}
                </New>
              <Buttons>
                <Left> 
                  <CreateButton
                    color="primary"
                    variant="contained"
                    onClick={prevStep}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={nextStep}
                >Save and Continue</CreateButton>
              </Buttons>
            </FormWrapper>
            </Wrapper>

            );

    };
};

// The "Submit" page is the 4th panel of the registration 
export class Submit extends Component {
  render() {
    const { values, handleChangeSave, nextStep, prevStep, submit } = this.props;

    return (
          <Wrapper>
            <FormWrapper>
              <H1>Application</H1>
                <H2>4/4: Confirm Application Details</H2>
           <br />
            <Div>
              <Category> First Name: </Category> <It> {values.first_name} </It>
            </Div>
            <Div>
            <Category> Last Name: </Category><It> {values.last_name} </It>
            </Div>
            <Div>
            <Category> Other Names: </Category><It> {values.other_names} </It>
            </Div>
            <Div>
            <Category> Mobile Number: </Category><It> {values.mobile_number} </It>
            </Div>
            <Div>
            <Category> Gender: </Category><It> {values.gender} </It>
            </Div>
            <Div>
            <Category> Employing Authority: </Category><It> {values.employing_authority} </It>
            </Div>
            <Div>
            <Category> Pin Code: </Category><It> {values.pin_code} </It>
            </Div>
            <Div>
            <Category> Nassit Number: </Category><It> {values.nassit} </It>
            </Div>
            <Div>
            <Category> Qualifications: </Category><It> {values.qualifications} </It>
            </Div>
            <Div>
            <Category> Special Skills: </Category><It> {values.special_skills} </It>
            </Div>
            <Div>
            </Div> 
          <br />
        <Buttons>
          <Left> 
          <CreateButton
            color="primary"
            variant="contained"
            onClick={prevStep}
          >Go Back to Edit</CreateButton> 
          </Left>
          <CreateButton
            color="primary"
            variant="contained"
            onClick={submit}
          >Submit</CreateButton>
          </Buttons>

          </FormWrapper>
          </Wrapper>
    );
  }
}



const CForm = styled(Form)`
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

const H2 = styled(H1)`
font-size: 12pt;`