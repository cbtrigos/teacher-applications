import React, { Component } from "react";
import {H1, H2,Tooltip, InfoIcon, TooltipText, Wrapper, Buttons, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton} from '../../../constants/utils/Styling.jsx'
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"

export function Info(title) {
  event.preventDefault();

  return (
    <Tooltip> 
      <InfoIcon/>
      <TooltipText>{title}</TooltipText>
    </Tooltip>
  );
}


export default class TeacherInfo extends Component {
    render() {
      const { values, handleChangeSave, step} = this.props;
          return (
              <Wrapper>
               <FormWrapper>
               <H1>Teacher Application</H1>
               <H2>{values.job_title} at {values.school_name} <br/>
              Application #{values.application_id}<br/><br/>

                School and Teacher Information: Part 2/5</H2><br/>
                  <Buttons> 
                
                  </Buttons>

                  <New>
                      <Label htmlFor="school_name">School Name *
                      </Label>
                      <Input
                          type = "text"
                          name="school_name"
                          noValidate
                          disabled={true}
                          defaultValue={values.school_name}
                          />
                  </New>
                  <New>
                      <Label htmlFor="school_district">School District *
                      </Label>
                      <Input
                          type = "text"
                          name="school_district"
                          noValidate
                          disabled={true}
                          defaultValue={values.school_district}
                          />
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
              <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                  disabled = {values.formErrors.pin_code!=='' || values.formErrors.nassit!==''}
                  >Save and Exit</CreateButton>
              </FormWrapper>
              </Wrapper>
  
              );
  
      };
};