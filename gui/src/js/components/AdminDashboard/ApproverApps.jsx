import React, { Component } from "react";
import {H1, A, H2, It, HorizSeparator, Wrapper, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import styled from "styled-components";
import Application from "./Application.jsx"
import DraftPanels from './ApplicationPanels.jsx'
import SubmittedPanels  from './ApplicationPanels.jsx'


// The "App Type" page is the 0th panel of registration 
export default class ApproverApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toApprove: [],
      approved: [], 
    };
  }


  async componentDidMount() {
    console.log('getting all applications')
       axios 
        .post('http://localhost:5000/api/approver-applications', 
          {"user_id": this.props.user.user_id, 
          "user_type": this.props.user.user_type
        }) 
        .then(response => {
          if (response.data==="error in getting applications") {
           throw new Error("Error in pulling application information") } 
          else {
            this.setState({ 
              toApprove: response.data.toApprove, 
              alreadyApproved: response.data.approved,
              chosen: null
            });
          }
        })
  }

  // rejectApplication = (input) => {
  //   axios 
  //     .post('http://localhost:5000/api/delete-application', 
  //       {"application_id": input,
  //     }) 
  //     .then(response => {
  //       if (response.data==='application deleted successfully') {
  //         console.log(response.data)
  //       } else {console.log(response.data)}
  //     })
  //     window.location.reload();
  // }

  render() {
    const user = this.props.user
    const toDos = this.state.currentApps.map(item => 
          <DraftPanels key={item.application_id} application={item} type='toApprove' />
          );
    const history = this.state.submittedApps.map(item =>
      <SubmittedPanels key={item.application_id} application={item} type='approved'  />
     );
    console.log(this.state.submittedApps)
        return (
         <Wrapper>
                <FormWrapper>
                <H1>{user.first_name}'s Applications</H1>
                    <div>
                    <HorizSeparator/>
                      <div>
                        <H2>Unfinished Applications</H2>
                        {toDos}
                        {this.state.toApprove.length===0 && <It> No applications to approve. All done!</It>}
                      </div>
                      <div>
                      <HorizSeparator/>
                      <H2>Submitted Applications</H2>
                      {this.state.submitted.length===0 &&  <It>You haven't approved any applications yet! </It> }
                        {history}
                      </div>
                      </div>
                </FormWrapper>
                </Wrapper>
            );
          
        }

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