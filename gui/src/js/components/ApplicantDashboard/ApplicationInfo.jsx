import React, { Component } from "react";
import {H1, H2, It, Tooltip, InfoIcon, TooltipText, Clearlink, TextArea, Wrapper, WideButton, Buttons, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"
import { CountryDropdown } from 'react-country-region-selector';
import NumberFormat from 'react-number-format';
import Districts from '../../constants/utils/Districts.json'

export default function Info(title) {
  event.preventDefault();

  return (
    <Tooltip> 
      <InfoIcon/>
      <TooltipText>{title}</TooltipText>
    </Tooltip>
  );
}

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
    const {values, handleChangeSave, handleNationalityChange, step } = this.props;
        return (
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
                  Application #{values.application_id}<br/><br/>
                  Personal Information: Part 1/5</H2><br/>        

                <Buttons> 
                <Left>
                    <Label htmlFor="firstName">First Name * </Label>
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
                    <Label htmlFor="lastName">Last Name *</Label>
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
                    <Label htmlFor="other_names">Other Names 
                    {Info(values.toolTip.other_names)}
                    </Label>

                        <Input
                            type = "text"
                            name='other_names'
                            noValidate
                            onChange={handleChangeSave('other_names')}
                            defaultValue={values.other_names}
                            />
                </New>
                <New>

                    <Label htmlFor="mobile_number">Mobile Number *</Label>
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
                    <Label htmlFor="gender">Gender *</Label>

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
                    <Label htmlFor="birth_date">Birth Date *</Label>
                        <Input
                            type = "text"
                            name='birth_date'
                            noValidate
                            disabled={true}
                            onChange={handleChangeSave('birth_date')}
                            defaultValue={values.birth_date}
                            />
                </New>
                <New>
                    <Label htmlFor="nationality"> Nationality *
                    {Info(values.toolTip.nationality)}

                    </Label>

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
                <New>
                    <Label htmlFor="national_id"> National Identification Number *
                    {Info(values.toolTip.national_id)}
                    </Label>
                    <Input
                          customInput={Input} 
                          value={values.national_id} 
                          onChange={handleChangeSave('national_id')}
                          />
                   {values.formErrors.national_id!==''
                      && <ErrorMessage>{values.formErrors.national_id}</ErrorMessage>}
                </New>

                <br/> <br/> 
                <Buttons>
                  <Left>
                  <Clearlink href='/dashboard/'><CreateButton
                    color="primary"
                    variant="contained"
                    onClick={step('exit')}
                    disabled = {values.formErrors.national_id!==''}
                    >Save and Exit</CreateButton></Clearlink>
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                  disabled = {values.formErrors.national_id!==''}

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
                      <Label htmlFor="employing_authority">Employing authority *
                      {Info(values.toolTip.employing_authority)}
                      </Label>
                      <Input
                          type = "text"
                          name="employing_authority"
                          noValidate
                          onChange={handleChangeSave('employing_authority')}
                          defaultValue={values.employing_authority}
                          />
                  </New>
                  <New>
                      <Label htmlFor="school_name">School Name *
                      {Info(values.toolTip.school_name)}
                      </Label>
                      <Input
                          type = "text"
                          name="school_name"
                          noValidate
                          onChange={handleChangeSave('school_name')}
                          defaultValue={values.school_name}
                          />
                  </New>
                  <New>
                      <Label htmlFor="school_district">School District *
                      {Info(values.toolTip.school_district)}
                      </Label>
                      {/* <Input
                          type = "text"
                          name="school_district"
                          noValidate
                          onChange={handleChangeSave('school_district')}
                          defaultValue={values.school_district}
                          /> */}
                              <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={values.school_district}
                                  defaultValue={values.school_district}
                                  onChange={handleChangeSave('school_district')}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={"Kenema"}>Kenema</MenuItem>
                                  <MenuItem value={"Kailahun"}>Kailahun</MenuItem>
                                  <MenuItem value={"Kenema"}>Kenema</MenuItem>
                                  <MenuItem value={"Kono"}>Kono</MenuItem>
                                  <MenuItem value={"Bombali"}>Bombali</MenuItem>
                                  <MenuItem value={"Kambia"}>Kambia</MenuItem>
                                  <MenuItem value={"Koinadugu"}>Koinadugu</MenuItem>
                                  <MenuItem value={"Port Loko"}>Port Loko</MenuItem>
                                  <MenuItem value={"Tonkolili"}>Tonkolili</MenuItem>
                                  <MenuItem value={"Bo"}>Bo</MenuItem>
                                  <MenuItem value={"Bonthe"}>Bonthe</MenuItem>
                                  <MenuItem value={"Moyamba"}>Moyamba</MenuItem>
                                  <MenuItem value={"Pujehun"}>Pujehun</MenuItem>
                                  <MenuItem value={"Western Area Rural"}>Western Area Rural</MenuItem>
                                  <MenuItem value={"Western Area Urban"}>Western Area Urban</MenuItem>
                                  <MenuItem value={"Bo"}>Bo</MenuItem>
                                </Select>
                              </FormControl>
                  </New>
                  <New>
                      <Label htmlFor="pin_code"> Pin Code (if any)
                      {Info(values.toolTip.pin_code)}

                      </Label>
  
                          <Input
                              type = "text"
                              name='Pin Code'
                              noValidate
                              onChange={handleChangeSave('pin_code')}
                              defaultValue={values.pin_code}
                              />
                        {values.formErrors.pin_code!=='' && <ErrorMessage> {values.formErrors.pin_code}</ErrorMessage>}   
                  </New>
                  <New>
                      <Label htmlFor="nassit"> Nassit Number (if any)
                      {Info(values.toolTip.nassit)}

                      </Label>
  
                          <Input
                              type = "text"
                              name='nassit'
                              noValidate
                              onChange={handleChangeSave('nassit')}
                              defaultValue={values.nassit}
                              />
                        {values.formErrors.nassit!=='' && <ErrorMessage> {values.formErrors.nassit}</ErrorMessage>}   
                 </New>
                  
                  <New>
                      <Label htmlFor="prev_appt"> Previous Employment (if any)
                      {Info(values.toolTip.prev_appt)}

                      </Label>
  
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
                    disabled = {values.formErrors.pin_code!=='' || values.formErrors.nassit!==''}
                  >Save and Go Back</CreateButton> 
                </Left>
                <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('next')}
                  disabled = {values.formErrors.pin_code!=='' || values.formErrors.nassit!==''}

                >Save and Continue</CreateButton>
              </Buttons>
              <Clearlink href='/dashboard/'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                  disabled = {values.formErrors.pin_code!=='' || values.formErrors.nassit!==''}
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
                    <Label htmlFor="qualifications"> Qualifications and Certificate Numbers (if any) {Info(values.toolTip.qualifications)}</Label>

                        <TextArea
                            type = "text"
                            name='qualifications'
                            noValidate
                            onChange={handleChangeSave('qualifications')}
                            defaultValue={values.qualifications}
                            />
                </New>
                <New>
                    <Label htmlFor="special_skills"> Special Skills (if any)
                    {Info(values.toolTip.special_skills)}

                    </Label>

                        <TextArea
                            type = "text"
                            name='special_skills'
                            noValidate
                            onChange={handleChangeSave('special_skills')}
                            defaultValue={values.special_skills}
                            />
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
              <Clearlink href='/dashboard/'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                >Save and Exit</CreateButton></Clearlink>
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class Attachments extends Component {
  render() {
    const { values, step} = this.props;
        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>
              Attachments: Part 4/5</H2><br/>
              Please attach all certificates listed previously 
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
              <Clearlink href='/dashboard/'><CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                >Save and Exit</CreateButton></Clearlink>
            </FormWrapper>
            </Wrapper>

            );

    };
};
export class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingString: '',
      errors: '', 
      formDisabled:true
    }
  }
  async componentDidMount() {
    let disabled = false;
    let errors = ''
    let missingString = ''
    const app = this.props.values
    const req = [app.employing_authority, app.national_id, app.nationality, app.school_name]
    // const optional = [app.other_names, app.pin_code, app.nassit, app.qualifications, app.special_skills]
    const list = [{val:app.other_names, name:'any other names'}, {val:app.pin_code, name:'a pin code'}, {val:app.nassit, name:'a NASSIT number'}, {val:app.qualifications, name:'any qualifications'}, {val:app.special_skills, name:'any special skills'}]
    const emptyFields = []
    list.forEach(
      (i) => {
      if (i['val']===null || i['val']==='') {emptyFields.push(i['name'])}
      })
    if (emptyFields.length!==0) 
      {missingString = emptyFields.join(', ')}
    Object.values(req).forEach((val) => {
      if (val===null) {
        disabled = true
        errors ='The following are required: National Identification Number, School Name, Employing Authority, and Nationality.'
      }});
      this.setState({
        errors: errors, 
        missingString: missingString, 
        formDisabled: disabled
      })
  }

  render() {
    const { values, checkmarked, step, submit, handleCheckboxChange, validateApplication } = this.props;

    
    return (
          <Wrapper>
            <FormWrapper>
              <H1>Application</H1>
                <H2>{values.application_type} School <br/>
              Application #{values.application_id}<br/><br/>
               5/5: Confirm Application Details</H2>
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
            <Category> National Identification Number: </Category><It> {values.national_id} </It>
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

        {this.state.missingString!='' &&
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
          I verify that I purposefully did not provide the following: {this.state.missingString}.
          </New></Buttons>
          }
          </H2>
          {this.state.missingString.length> 0 && !checkmarked && <ErrorMessage>Please check the above box in order to submit.</ErrorMessage>}
          {this.state.errors!=='' && <ErrorMessage>{this.state.errors}</ErrorMessage>}

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
            disabled = {this.state.formDisabled}
            onClick={submit}
          >Submit</CreateButton>
          </Buttons>
          <Clearlink href='/dashboard/'><CreateButton
            color="primary"
            variant="contained"
            onClick={step('exit')}
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
          <Clearlink href='/dashboard/'>
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