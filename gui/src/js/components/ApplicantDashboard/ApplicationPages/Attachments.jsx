import React, { Component } from "react";
import {H1, H2, Tooltip, InfoIcon, TooltipText, Clearlink, Wrapper,  Buttons, Left, FormWrapper,  CreateButton} from '../../../constants/utils/Styling.jsx'

export function Info(title) {
  event.preventDefault();

  return (
    <Tooltip> 
      <InfoIcon/>
      <TooltipText>{title}</TooltipText>
    </Tooltip>
  );
}

export default class Attachments extends Component {
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