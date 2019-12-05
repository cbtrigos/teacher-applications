import React, { Component } from "react";
import {H1, H2,  Tooltip, InfoIcon, TooltipText, Wrapper, Buttons, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton} from '../../../constants/utils/Styling.jsx'
import { CountryDropdown } from 'react-country-region-selector';
import NumberFormat from 'react-number-format';

export  function Info(title) {
  event.preventDefault();

  return (
    <Tooltip> 
      <InfoIcon/>
      <TooltipText>{title}</TooltipText>
    </Tooltip>
  );
}


export default class PersonalInfo extends Component {

  render() {
    const {values, handleChangeSave, handleNationalityChange, step } = this.props;
        return (
            <Wrapper>
             <FormWrapper>
             <H1>Teacher Application</H1>
             <H2>{values.title_proposed_appt} at {values.school_name} <br/>
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
                            defaultValue={values.birth_date.slice(0,10)}
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
                  <CreateButton
                    color="primary"
                    variant="contained"
                    onClick={step('exit')}
                    disabled = {values.formErrors.national_id!==''}
                    >Save and Exit</CreateButton>
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