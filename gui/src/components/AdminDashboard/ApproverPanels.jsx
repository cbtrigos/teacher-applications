import React, { Component } from "react";
import {H1, H2, It, HorizSeparator, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import PanelContent from './PanelContent.jsx'


// The "App Type" page is the 0th panel of registration 
export default class ApproverPanels extends Component {
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
          if (response.data==="error in getting applications") {
           throw new Error("Error in pulling application information") } 
          else {
            this.setState({ 
              toApprove: response.data.toApprove, 
              alreadyApproved: response.data.alreadyApproved,
            });
          }
        })
  }

  approveApplication = (application) => {
    if (window.confirm('Please press ok to continue with the approval of application #'+ application.application_id +', or cancel to go back.')) {
      axios 
      .post('http://localhost:5000/api/approve-approver-applications-'+this.props.user.user_type, 
        {"user_id": this.props.user.user_id, 
        "user_type": this.props.user.user_type,
        "application": application 
      }) 
      .then(response => {
        if (response.data==="error submitting applications") {
        throw new Error("Error approving the application") } 
        else window.location.reload();

      })
  }};

  rejectApplication = (application) =>  { 
    if (window.confirm('Are you sure you wish to reject application #'+ application.application_id +'? Press ok to reject.')) {
      axios 
      .post('http://localhost:5000/api/reject-approver-applications-'+this.props.user.user_type, 
        {"user_id": this.props.user.user_id, 
        "user_type": this.props.user.user_type,
        "application": application
      }) 
      .then(response => {
        if (response.data==="error rejecting applications") {
        throw new Error("Error rejecting the application") } 
        else window.location.reload();

      })
  }}

  render() {
    const user = this.props.user
    const toDos = this.state.toApprove.map(item => 
          <PanelContent 
            key={item.application_id} 
            user = {user}
            application={item} 
            type='toApprove' 
            approveApplication = {this.approveApplication}
            rejectApplication = {this.rejectApplication}
            />
    );
    const history = this.state.alreadyApproved.map(item =>
          <PanelContent 
            key={item.application_id} 
            user = {user}
            application={item} 
            type='alreadyApproved' 
            rejectApplication={this.rejectApplication} 
            approveApplication={this.approveApplication} 
          />
     );
        return (
                <FormWrapper large>
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
                      <H2>Applications already Reviewed</H2>
                      {this.state.alreadyApproved.length===0 &&  <It>You haven't approved any applications yet! </It> }
                        {history}
                      </div>
                      </div>
                </FormWrapper>
            );
          
        }

    };
