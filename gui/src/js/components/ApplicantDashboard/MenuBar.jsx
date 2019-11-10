import React, { Component } from 'react';
import {H1, SharedNew, Wrapper, Left, Right, FormWrapper, Input, Button, Buttons, Label, New, ErrorMessage, CreateButton, A_center} from '../Styling.jsx'
import styled from "styled-components";


export default class MenuBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        view: 'welcome'
      };
    }
      render() {
      const {updateView} = this.props
          return(
        <Wrapper>
            <FormWrapper>
                <CreateButton onClick={updateView('welcome')}>Homepage</CreateButton>
                <CreateButton onClick={updateView('create application')}>Your Applications</CreateButton>
                <CreateButton>Your Personal Information</CreateButton>
                <CreateButton>Notifications</CreateButton>
            </FormWrapper>
        </Wrapper>
          );
      }
    }
    