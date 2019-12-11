import React, { Component } from "react";
import {H1, A, Input, H2, It, HorizSeparator, Wrapper, FormWrapper} from '../constants/utils/Styling.jsx'
import axios from 'axios';
import Application from "./ApplicantDashboard/Application.jsx"
import DraftPanels from './ApplicantDashboard/ApplicationPanels.jsx'
import ApproverPanels from './AdminDashboard/ApproverPanels.jsx'
import MasterDash from "./MasterAccount/MasterDash.jsx";
import RequestingApproval from "./RequestingAdmin/RequestingApproval.jsx"

// The "App Type" page is the 0th panel of registration 
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedApps: [],
      currentApps: [], 
      chosen: null, 
        };
  }

  async componentDidMount() {
       axios 
        .post(process.env.REACT_APP_API+'/api/get-user-applications', 
          {"user_id": this.props.user.user_id
        }) 
        .then(response => {
          if (response.data==="error in getting applications") {
           throw new Error("Error in pulling application information") } 
          else {
            this.setState({ 
              submittedApps: response.data.submittedApps, 
              currentApps: response.data.incompleteApps,
              chosen: null
            });
          }
        })
  }

  updateChosen = (input) => {
    const application = input
    this.setState({
      chosen: application
    })
  }
  clearChosen = () => {
    this.setState({
      chosen: null
    })
    window.location.reload();
  }

  confirmDelete = (application_id) => {
     if (window.confirm('Are you sure you wish to delete application #'+ application_id +'? Press ok to delete.')) {
       this.deleteApplication(application_id)
     }

  };


  deleteApplication = (input) => {
    axios 
      .post(process.env.REACT_APP_API+'/api/delete-application', 
        {"application_id": input
      }) 
      .then(response => {
        if (response.data==='application deleted successfully') {
        }
      })
      window.location.reload();
  }

  render() {
    const user = this.props.user
    const startApp = <A href='/dashboard/new-application'>here</A>;
    const drafts = this.state.currentApps.map(item => 
          <DraftPanels key={item.application_id} application={item} type='draft' updateChosen={this.updateChosen} deleteApplication={this.confirmDelete}/>
          );
    const submitted = this.state.submittedApps.map(item =>
      <DraftPanels key={item.application_id} application={item} type='submitted' deleteApplication={this.deleteApplication} />
     );
        return (
        <>
        {user.user_type=== 0 // applicant dashboard
          ?  <>
            {this.state.chosen===null
              ? <Wrapper>
                  <FormWrapper large>
                    <H1>
                      Welcome to your personal dashboard, {user.first_name}!
                      </H1>
                    <H2> Click on Dashboard in the above menu to start. <br/><br/>
                        You can complete a primary, secondary, 
                        or vocational school application within 15 minutes, or you can start one and 
                        return whenever you're ready to submit it. <br/><br/>
                    Once submitted, you'll be able to track your application as it gets approved by each agency. 
                        As approval updates occur for your application, you'll receive both an email and a notification here in your dashboard!<br/><br/>
                        Good luck!
                    </H2>
                  </FormWrapper ><br/> <br/>

                <FormWrapper large>
                <H1>{user.first_name}'s Applications</H1>
                    <div>
                    <HorizSeparator/>
                      <div>
                        <H2>Unfinished Applications</H2>
                        {drafts}
                        {this.state.currentApps.length===0 ? <It>No applications to continue! Start a new application {startApp}.</It>: <It> Start another application {startApp}!</It>}
                      </div>
                      <div>
                      <HorizSeparator/>
                      <H2>Submitted Applications</H2>
                      {this.state.submittedApps.length===0 &&  <It>No submitted applications to track! </It> }
                        {submitted}
                      </div>
                      </div>
                </FormWrapper>
                </Wrapper>
              :
              <>
              <Application application={this.state.chosen} user = {this.props.user} clearChosen ={this.clearChosen}/>
              </> 
              }
            </>
        : [1,2,3].indexOf(user.user_type)!==-1 //approver dashboard
        ? 
          <> 
          <Wrapper>
            <FormWrapper large>
              <H1>
                Welcome to your personal dashboard, {user.first_name}!
              </H1>
              <H2>
                This dashboard was created for you to review applications efficiently and easily.<br/><br/>
                Explore the below applications and either approve or reject them right here in this page. <br/><br/>
                Good luck!
              </H2>
            </FormWrapper> <br/> <br/>
          <ApproverPanels user={this.props.user}/>
          </Wrapper>
        </>
      : user.user_type === 4 
        ? <RequestingApproval user = {user}/>
        : user.user_type===5 // master user 
          ? <MasterDash user = {user}/>
          : <></>
      
      }
      </>
            );
          
        }

    };

