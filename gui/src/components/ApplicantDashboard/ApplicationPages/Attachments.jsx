import React, { Component } from "react";
import {H1, H2, Tooltip, InfoIcon, TooltipText, Wrapper,  Buttons, Left, FormWrapper, New, CreateButton} from '../../../constants/utils/Styling.jsx'
import {DropzoneArea} from 'material-ui-dropzone'


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
    const {values, attachFiles, step } = this.props;

        return (
            <Wrapper>
              <FormWrapper>
              <H1>Teacher Application</H1>
              <H2>{values.job_title} at {values.school_name} <br/>
              Application #{values.application_id}<br/><br/>
              Attachments: Part 4/5</H2><br/>
              {values.qualification!=='' && <H2 tiny>Please attach your certificate from "{values.qualifications}"</H2> }
              {values.certificates!=='' && <H2 tiny>Listed certificates: "{values.certificates}"</H2> }
              <br/>
              <DropzoneArea 
                onChange={attachFiles()}
                showFileNamesInPreview = {true}
              />
              <br/> <H2 tiny>*Please note that there is a 3 file limit</H2>
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