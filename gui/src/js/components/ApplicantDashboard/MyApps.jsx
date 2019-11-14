import React, { Component } from "react";
import {H1, TextArea, Wrapper, WideButton, Buttons, Left, FormWrapper, Form, Input, Label, New, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import styled from 'styled-components'

// The "App Type" page is the 0th panel of registration 
export default class MyApps extends Component {

    
  render() {
    const user = this.props.user
        return (
            <Wrapper>
             <FormWrapper>
             <H1>{user.first_name}'s Applications</H1>

             </FormWrapper>
             </Wrapper>
            );

    };
};
