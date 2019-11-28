import React, { Component } from "react";
import {H1, H2,Tooltip, InfoIcon, TooltipText, Clearlink, Wrapper, Buttons, Left, FormWrapper, Input, Label, New, ErrorMessage, CreateButton} from '../../../constants/utils/Styling.jsx'
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
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px" }}>
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
                                  <MenuItem value={"Kenema"}><H2 left small>Kenema</H2></MenuItem>
                                  <MenuItem value={"Kono"}><H2 left small>Kono</H2></MenuItem>
                                  <MenuItem value={"Bombali"}><H2 left small>Bombali</H2></MenuItem>
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