import React, { Component } from "react";
import {H1, A, H2, It, HorizSeparator, Wrapper, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import styled from "styled-components";
import Application from "./Application.jsx"
import { Route, Redirect } from "react-router-dom";


// The "App Type" page is the 0th panel of registration 
export default class MyApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedApps: [],
      currentApps: [], 
    };
  }


  async componentDidMount() {
       axios 
        .post('http://localhost:5000/api/my-applications', 
          {"applicant_id": this.props.user.id
        }) 
        .then(response => {
          if (response.data==="error in getting applications") {
           throw new Error("Error in pulling application information") } 
          else {
            this.setState({ 
              submittedApps: response.data.submittedApps, 
              currentApps: response.data.incompleteApps
            });
          }
        })
  }
    
  render() {
    const user = this.props.user
    const startApp = <A href='new-application'>here</A>;
    const submitted = this.state.submittedApps.map(item => 
          <Wide key={item.application_id}>
            <It>{item.application_type} School application<br/>
                  Created on: {item.created},<br/>
                  Submitted on: {item.last_edited}
            </It>
          </Wide>
          );
    const drafts = this.state.currentApps.map(item => 
          <Wide key={item.application_id}>
            <It>{item.application_type} School application<br/> 
            Created on: {item.created},<br/>
            Last edited at: {item.last_edited}
            </It>
          </Wide>);

        return (
            <Wrapper>
             <FormWrapper>
             <H1>{user.first_name}'s Applications</H1>
             <HorizSeparator/>
              <div>
                <H2>Unfinished Applications</H2>
                {this.state.currentApps.length===0 && (this.state.submittedApps.length===0 ? <It>No applications to continue! Start a new application {startApp}.</It>: <It> No applications to continue!</It>)}
                
                {drafts}
              </div>
              <div>
              <HorizSeparator/>
              <H2>Submitted Applications</H2>
              {this.state.submittedApps.length===0 &&  <It>No submitted applications to track! </It> }
                {submitted}
              </div>
             </FormWrapper>
             </Wrapper>
            );

    };
};

const Wide = styled.button`
background-color: #93A3B1;
border: none;
width: 100%;
color: white;
// padding: 16px 32px;
text-align: center;
font-size: 16px;
margin: 4px 2px;
opacity: 0.6;
transition: 0.3s;
display: block;
text-decoration: none;
cursor: pointer;
&: hover {
  opacity:1
}
`