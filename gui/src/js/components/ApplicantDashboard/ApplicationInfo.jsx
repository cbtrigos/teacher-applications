import React, { Component } from "react";
import {H1, H2, It, Clearlink, TextArea, Wrapper, WideButton, Buttons, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import { CountryDropdown } from 'react-country-region-selector';
import NumberFormat from 'react-number-format';


export class AppType extends Component {
  render() {
    
    const { values, handleChangeSave, beginApp} = this.props;
        return ( 
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
             <H2>What type of school would you like to apply to?</H2>
             
              <WideButton
                type = "button"
                value='Primary'
                id='primary'
                chosen={values.application_type==='Primary'}
                noValidate
                onClick={handleChangeSave('application_type')}
                />

             <WideButton 
                type = "button"
                value='Secondary'
                chosen={values.application_type==='Secondary'}
                id='secondary'
                onClick={handleChangeSave('application_type')}
             />

              <WideButton 
                type = "button"
                chosen={values.application_type==='Vocational'}
                value='Vocational'
                id='vocational'
                onClick={handleChangeSave('application_type')}
               />


             
                <br/> <br/> 
                <CreateButton
                color="primary"
                variant="contained"
                onClick={beginApp()}
                disabled={values.application_type===null}
              >Begin Application</CreateButton> 
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class PersonalInfo extends Component {
  render() {
    const { values, handleChangeSave, handleNationalityChange, step } = this.props;
        return (
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
                  Application #{values.application_id}<br/><br/>
                  Personal Information: Part 1/5</H2><br/>        

                <Buttons> 
                <Left>
                    <Label htmlFor="firstName"> First Name</Label>
                        <Input
                            type = "text"
                            className=""
                            name='first_name'
                            noValidate 
                            disabled={true}
                            onChange={handleChangeSave('first_name') }
                            defaultValue={values.first_name} />
                           

                </Left>
                <New>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type = "text"
                        className=""
                        name='last_name'
                        noValidate
                        disabled={true}
                        onChange={handleChangeSave('last_name') }
                        defaultValue={values.last_name}

                        />

                </New> 
                </Buttons>

                <New>
                    <Label htmlFor="other_names"> Other Names</Label>

                        <Input
                            type = "text"
                            name='other_names'
                            noValidate
                            onChange={handleChangeSave('other_names')}
                            defaultValue={values.other_names}
                            />
                </New>
                <New>
                    <Label htmlFor="mobile_number"> Mobile Number</Label>
                      <NumberFormat 
                          disabled={true}
                          customInput={Input} 
                          format="+232 ## ######" 
                          mask="*"
                          value={values.mobile_number} 
                          onChange={handleChangeSave('mobile_number')}
                          />
                </New>
                <New>
                    <Label htmlFor="gender"> Gender</Label>

                        <Input
                            type = "text"
                            name='gender'
                            noValidate
                            disabled={true}
                            onChange={handleChangeSave('sex')}
                            defaultValue={values.sex}
                            />
                </New>
                <New>
                    <Label htmlFor="nationality"> Nationality</Label>

                    <CountryDropdown
                        country={values.nationality}
                        value={values.nationality}
                        priorityOptions={['SL', 'US']}
                        onChange={(val) => handleNationalityChange(val)}
                        style={{padding: '10px 10px',
                                margin: '0 0 1.5% 0',
                                width: '100%',
                                borderRadius: '5px',
                                outline: 'none',
                                border: '1px solid #cfcfcf',
                                height: '3em'
                        }}
                        tabIndex={100}
                       />
                </New>

                <br/> <br/> 
                <Buttons>
                  <Left>
                  <Clearlink href='my-applications'><CreateButton
                    color="primary"
                    variant="contained"
                    onClick={step('exit')}
                    disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
                  >Save and Exit</CreateButton></Clearlink>
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                  disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}

                >Save and Continue</CreateButton>
              </Buttons>

            </FormWrapper>
            </Wrapper>

            );

    };
};
export class TeacherInfo extends Component {
    render() {
      const { values, handleChangeSave, step} = this.props;
          return (
              <Wrapper>
               <FormWrapper>
               <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>

                Teacher Information: Part 2/5</H2><br/>
                  <Buttons> 
                
                  </Buttons>
                  <New>
                      <Label htmlFor="employing_authority">Employing authority </Label>
                      <Input
                          type = "text"
                          name="employing_authority"
                          noValidate
                          onChange={handleChangeSave('employing_authority')}
                          defaultValue={values.employing_authority}
                          />
                  </New>
                  <New>
                      <Label htmlFor="school_name">School Name </Label>
                      <Input
                          type = "text"
                          name="school_name"
                          noValidate
                          onChange={handleChangeSave('school_name')}
                          defaultValue={values.school_name}
                          />
                  </New>
                  <New>
                      <Label htmlFor="pin_code"> Pin Code (if any)</Label>
  
                          <Input
                              type = "text"
                              name='Pin Code'
                              noValidate
                              onChange={handleChangeSave('pin_code')}
                              defaultValue={values.pin_code}
                              />
                        {isNaN(values.pin_code) && <ErrorMessage> Value must be a number</ErrorMessage>}   
                  </New>
                  <New>
                      <Label htmlFor="nassit_number"> Nassit Number (if any)</Label>
  
                          <Input
                              type = "text"
                              name='nassit_number'
                              noValidate
                              onChange={handleChangeSave('nassit')}
                              defaultValue={values.nassit}
                              />
                        {isNaN(values.nassit) && <ErrorMessage> Value must be a number</ErrorMessage>}   
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
                    onClick={step('prev')}
                    disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                  disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}

                >Save and Continue</CreateButton>
              </Buttons>
              <Clearlink href='my-applications'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                  disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
                >Save and Exit</CreateButton></Clearlink>
              </FormWrapper>
              </Wrapper>
  
              );
  
      };
};
export class ShortAnswer extends Component {
  render() {
    const { values, handleChangeSave, step } = this.props;
        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>
              Short Answer: Part 3/5</H2><br/>
                <New>
                    <Label htmlFor="nassit_number"> Qualifications (if any)</Label>

                        <TextArea
                            type = "text"
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
                    onClick={step('prev')}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                >Save and Continue</CreateButton>
              </Buttons>
              <Clearlink href='my-applications'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                  disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
                >Save and Exit</CreateButton></Clearlink>
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class Attachments extends Component {
  render() {
    const { values, handleChangeSave, step} = this.props;
        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>
              Attachments: Part 4/5</H2><br/>
               ***** 
              <Buttons>
                <Left> 
                  <CreateButton
                    color="primary"
                    variant="contained"
                    onClick={step('prev')}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                >Save and Continue</CreateButton>
              </Buttons>
              <Clearlink href='my-applications'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                  disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
                >Save and Exit</CreateButton></Clearlink>
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class Submit extends Component {
  constructor(props) {
    super(props);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.getMissingString = this.getMissingString.bind(this);
  }

    getMissingString = () => {
      const {mobile_number, other_names, school_name, pin_code, nassit, qualifications, special_skills} = this.props.values
      const list = [{val: school_name, name: 'a school name'},{val:mobile_number, name:'a mobile number'}, {val:other_names, name:'any other names'}, {val:pin_code, name:'a pin code'}, {val:nassit, name:'a NASSIT number'}, {val:qualifications, name:'any qualifications'}, {val:special_skills, name:'any special skills'}]
  
      const emptyFields = []
      list.forEach(
        (i) => {
        if (i['val']===null || i['val']==='') {emptyFields.push(i['name'])}
        })
      if (emptyFields.length!==0) {return emptyFields.join(', ')}
      else {
        return ''}
    }

    getErrorMessage = (nationality, employingAuth) => {
      if ((nationality===null || nationality==='') && (employingAuth===null || employingAuth==='')) 
        {return 'Both the nationality and the employing authority fields are required. Please return and provide them before proceeding.'}
      else if (nationality===null || nationality==='') {
        return 'The nationality field is required. Please return to provide it before proceeding.'}
      else if (employingAuth===null || employingAuth==='') 
        {return 'The employing authority field is required. Please return and provide it before proceeding.'}
      return ''
    }

  render() {
    const { values, checkmarked, step, submit, handleCheckboxChange } = this.props;
    const errorMessage = this.getErrorMessage(values.nationality, values.employing_authority)
    const missingString = this.getMissingString()
    return (
          <Wrapper>
            <FormWrapper>
              <H1>Application</H1>
                <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>
               5/5: Confirm Application Details</H2><br/>
           <H2>
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
            <Category> Gender: </Category><It> {values.sex} </It>
            </Div>

            <Div>
            <Category> Nationality: </Category><It> {values.nationality} </It>
            </Div>

            <Div>
            <Category> Employing Authority: </Category><It> {values.employing_authority} </It>
            </Div>
            <Div>
            <Category> School Name: </Category><It> {values.school_name} </It>
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
          <br />
        {missingString!='' &&
          <Buttons>
            <Left style={{minWidth: '2%', width: '4%', marginRight:'-1%'}}>
              <Input 
              type="checkbox"
              checked={checkmarked}
              id='checked'
              onChange={handleCheckboxChange()}
              />
            </Left>
            <New >
          I verify that I purposefully did not provide the following: {missingString}.
          </New></Buttons>
          }
          </H2>
          {missingString!='' && !checkmarked && <ErrorMessage>Please check the above box in order to submit.</ErrorMessage>}
          {errorMessage!==null && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Buttons>
          <Left> 
          <CreateButton
            color="primary"
            variant="contained"
            onClick={step('prev')}
          >Go Back to Edit</CreateButton> 
          </Left>
          <CreateButton
            color="primary"
            variant="contained"
            disabled={(missingString!='' && !checkmarked) || errorMessage!==''}
            onClick={submit}
          >Submit</CreateButton>
          </Buttons>
          <Clearlink href='my-applications'><CreateButton
            color="primary"
            variant="contained"
            onClick={step('exit')}
            disabled = {isNaN(values.nassit) || isNaN(values.pin_code)}
          >Exit</CreateButton></Clearlink>
          
          </FormWrapper>
          </Wrapper>
    );
  }
};
export class Completed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { values } = this.props;
    return (
          <Wrapper>
            <FormWrapper>
              <H1>Application</H1>
                <H2>{values.application_type} School <br/>
                Application #{values.application_id}<br/><br/>
  
                </H2>
           <H2>
              Application submitted successfully! <br/>
              You'll hear from us as soon as approval updates begin. <br/>
              Thank you for applying to teach Sierra Leone's youth. <br/>
          <br />
          <Clearlink href='/dashboard/my-applications'>
          <CreateButton
            color="primary"
            variant="contained"
          >Return to Dashboard</CreateButton> </Clearlink>

          </H2>
          </FormWrapper>
          </Wrapper>
    );
  }
};




const Div = styled.div`
margin: 13px;`

const Category= styled.div`
background-color: lightgrey;
text-align: center;
font: inherit;`


const SLeft = styled(Left)`
width: 10px`


const Phoneinput = styled.input`
    padding: 10px 10px;
    margin: 0 0 1.5% 0;
    width: 100%;
    border-radius: 5px;
    outline: none;
    border: 1px solid #cfcfcf;
    float: right;
    ::placeholder {
        font-size: 1em;
        font-weight: light;
        color: #999;
    };
    `