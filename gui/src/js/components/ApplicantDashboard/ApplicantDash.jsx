import React, { Component } from 'react';
import {H1, SharedNew, Wrapper, Left, Right, FormWrapper, Input, Buttons, Label, New, ErrorMessage, CreateButton, A_center} from '../Styling.jsx'
import styled from "styled-components";
import Application from './Application.jsx'
import MenuBar from './MenuBar.jsx'
import Welcome from './Welcome.jsx'


export default class ApplicantDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'welcome'
    };
  }

  updateView = input => e => {
    event.preventDefault();
    this.setState({ view: [input]});
  }
    render() {
      return (
          <SideWrapper> 
              <Menu>
              <MenuBar updateView={this.updateView}/> 
              </Menu>

              <View> 
              {this.state.view=='welcome' && (<Welcome />)}
              {this.state.view=='create application' && ( <Application/>)}
              </View> 
          </SideWrapper>

      );
    }
  }
  
  // const SideWrapper = styled.div`

const SideWrapper = styled(Wrapper)`
width: 100%;
display:inline-block;
padding-top: 1%;
margin: 0px;
`

const Menu = styled.div`
display: inline-block;
width: 23%;
text-align: left;
// border-radius: 3px;
margin: 1% 0 0 1%;
vertical-align: top;
max-width: 100%;
`
const View = styled.div`
display: inline-block;
text-align: left;
width: 74%;
border-radius: 3px;
margin: 1% 1% 0 0 ;
max-width: 100%;
`
const Form = styled(FormWrapper)`
max-width: 100%;`