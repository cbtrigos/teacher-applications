import React, { Component } from "react";
import {H1, H2, Tooltip, InfoIcon, TooltipText, TextArea, Wrapper, Buttons, Left, FormWrapper,  Label, New, CreateButton} from '../../../constants/utils/Styling.jsx'
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

export default class ShortAnswer extends Component {
  render() {
    const { values, handleChangeSave, step } = this.props;
        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.job_title} at {values.school_name} <br/>
              Application #{values.application_id}<br/><br/>
              Short Answer: Part 3/5</H2><br/>
              <New>
                      <Label htmlFor="qualifications">Qualifications *
                      {Info(values.toolTip.school_district)}
                      </Label>
                              <FormControl variant="outlined" style={{ width: "100%", height: "45px" }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                </InputLabel>
                                <Select style={{ height: "45px" }}
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={values.qualifications}
                                  defaultValue={values.qualifications}
                                  onChange={handleChangeSave('qualifications')}
                                >
                                  <MenuItem value=""><H2 small>Please select one:</H2></MenuItem>
                                  <MenuItem value={""}><H2 left small >None</H2></MenuItem>
                                  <MenuItem value={"Teachers Certificate Lower (TCL)"}><H2 left small>Teachers Certificate Lower (TCL)</H2></MenuItem>
                                  <MenuItem value={"Teachers Certificate (TC)"}><H2 left small>Teachers Certificate (TC)</H2></MenuItem>
                                  <MenuItem value={"Higher Teachers Certificate (HTC) Primary or Secondary"}><H2 left small>Higher Teachers Certificate (HTC) Primary or Secondary</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Science or Arts (B.Sc./B.A.) Hons or Gen"}><H2 left small>Bachelors of Science or Arts (B.Sc./B.A.) Hons or Gen</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Education"}><H2 left small>Bachelors of Education</H2></MenuItem>
                                  <MenuItem value={"Bachelors of Science or Arts in Education"}><H2 left small>Bachelors of Science or Arts in Education</H2></MenuItem>
                                  <MenuItem value={"Masters in Education or a Higher Degree"}><H2 left small>Masters in Education or a Higher Degree</H2></MenuItem>
                                 </Select>
                              </FormControl>
                  </New>
                <New>
                    <Label htmlFor="certificates"> Certificate Number(s) and associated School(s) {Info(values.toolTip.certificates)}</Label>

                        <TextArea
                            type = "text"
                            name='certificates'
                            noValidate
                            onChange={handleChangeSave('certificates')}
                            defaultValue={values.certificates}
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
              <CreateButton
                  color="primary"
                  variant="contained"
                  onClick={step('exit')}
                >Save and Exit</CreateButton>
            </FormWrapper>
            </Wrapper>

            );

    };
};