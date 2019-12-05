import React, { Component } from "react";
import {H1, H2, Tooltip, InfoIcon, TooltipText, Clearlink, Wrapper,  FormWrapper,  CreateButton} from '../../../constants/utils/Styling.jsx'

export function Info(title) {
  event.preventDefault();

  return (
    <Tooltip> 
      <InfoIcon/>
      <TooltipText>{title}</TooltipText>
    </Tooltip>
  );
}


export default class Completed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { values } = this.props;
    return (
          <Wrapper>
            <FormWrapper>
              <H1>Application</H1>
                <H2>{values.title_proposed_appt} at {values.school_name} <br/>
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

