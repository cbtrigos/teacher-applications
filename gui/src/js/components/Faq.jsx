import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import {H1, Wrapper, FormWrapper, A} from './Styling.jsx'
import styled from "styled-components";




export default class FAQ extends Component { 
  render() {
    var register = <A href='/register'>here</A>;

    return (
      <Wrapper>
        <FormWrapper>

         <Collapse  trigger="What do I need in order to fill out a teacher application?" overflowWhenOpen="visible" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}>
            <p>The applications are all the same for primary, secondary, and vocational applications.</p>
            <p>Here's a list of everything you need.</p>
          </Collapse>
          <Collapse trigger="Do I need to register in order to start a teacher application">
            <p>Yes! With your registration on this portal, you will be able to get real-time updates about your applications. You can register {register}.</p>
          </Collapse>
          <Collapse trigger="When will I know if I was approved or rejected?">
            <p>Before this digital platform existed, the teacher application was a paper-based system that traveled all across Sierra Leone to be hand-signed by five different agencies.
              This often took as long as 3 months. With this system, you will be able to track your application in real-time and receive a decision in around 2 weeks time. 
            </p>
          </Collapse>
          <Collapse trigger="Can I update my appication after submission?">
            <p>Once an application has been submitted, it cannot be modified or updated. You can, however, delete your application if you so choose, and restart from the beginning. 
            </p>
          </Collapse>
          <Collapse trigger="Have any other questions? Submit your question here">
              <p>place a link to the contact page here </p>
          </Collapse> 

        </FormWrapper>
      </Wrapper>

    );
  }
}

const Collapse = styled(Collapsible)`
background-color: lightgrey;
margin: 3px;`