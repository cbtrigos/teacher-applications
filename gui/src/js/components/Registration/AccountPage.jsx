import React, { Component } from 'react';
import {H1, H2, Wrapper, FormWrapper, } from '../../constants/utils/Styling.jsx'


export default class AccountPage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <Wrapper>
        <FormWrapper> 
        <H1>{this.props.user.first_name}'s Account Page</H1>
            <H2>Edit your account here</H2>
        </FormWrapper>
        </Wrapper>
    );
  }
}
