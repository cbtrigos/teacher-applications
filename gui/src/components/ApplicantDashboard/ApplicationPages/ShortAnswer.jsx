import React, { Component } from "react";
import {H1, H2,Tooltip, InfoIcon, TooltipText, Clearlink, TextArea, Wrapper, Buttons, Left, FormWrapper,  Label, New, CreateButton} from '../../../constants/utils/Styling.jsx'

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