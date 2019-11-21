import React, { Component } from "react";
import {H1,  H2, It, HorizSeparator, Wrapper, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import styled from "styled-components";
import ApproverPanels from './ApproverPanels.jsx'


// The "App Type" page is the 0th panel of registration 
export default class ApproverApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toApprove: [],
      alreadyApproved: [], 
    };
  }


  async componentDidMount() {
       axios 
        .post('http://localhost:5000/api/get-approver-applications-'+this.props.user.user_type, 
          {"user_id": this.props.user.user_id, 
          "user_type": this.props.user.user_type
        }) 
        .then(response => {
          console.log(response)
          if (response.data==="error in getting applications") {
           throw new Error("Error in pulling application information") } 
          else {
            console.log(response)
            this.setState({ 
              toApprove: response.data.toApprove, 
              alreadyApproved: response.data.alreadyApproved,
            });
          }
        })
  }

  approveApplication = (input) => {

    // confirm all the information needed has been collected then head here 
    // first input row into approver_? with all the info + approved='true'
    // second change in applications approver_? to 'true'
    // verifies all previous approvals have been made 

  };

 confirmApplication = (input) => {

    // confirm all the information needed has been collected then head here 
    // then call approveApplication 
    this.approveApplication(input)

  }

  rejectApplication = (input) => {
    // update applications with rejection reason + approved = 'false'
    // create row in approver_? that the application was rejected 
    // email the applicant that it has been rejected 
  }

  render() {
    {console.log(this.state)}
    const user = this.props.user
    const toDos = this.state.toApprove.map(item => 
          <ApproverPanels key={item.application_id} application={item} type='toApprove' />
          );
    const history = this.state.alreadyApproved.map(item =>
      <ApproverPanels key={item.application_id} application={item} type='alreadyApproved'  />
     );
        return (
                <FormWrapper>
                <H1>{user.first_name}'s Applications</H1>
                    <div>
                    <HorizSeparator/>
                      <div>
                        <H2>Applications to Approve</H2>
                        {toDos}
                        {this.state.toApprove.length===0 && <It> No applications to approve. All done!</It>}
                      </div>
                      <div>
                      <HorizSeparator/>
                      <H2>Applications already Approved</H2>
                      {this.state.alreadyApproved.length===0 &&  <It>You haven't approved any applications yet! </It> }
                        {history}
                      </div>
                      </div>
                </FormWrapper>
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