import React, { Component } from "react";
import {H1, A, H2, It, HorizSeparator, Wrapper, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import Application from "./Application.jsx"
import DraftPanels from './ApplicationPanels.jsx'


// The "App Type" page is the 0th panel of registration 
export default class MyApps extends Component {
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
        .post('http://localhost:5000/api/get-user-applications', 
          {"user_id": this.props.user.user_id
        }) 
        .then(response => {
          console.log(response)
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
      .post('http://localhost:5000/api/delete-application', 
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
    const startApp = <A href='new-application'>here</A>;
    const drafts = this.state.currentApps.map(item => 
          <DraftPanels key={item.application_id} application={item} type='draft' updateChosen={this.updateChosen} deleteApplication={this.confirmDelete}/>
          );
    const submitted = this.state.submittedApps.map(item =>
      <DraftPanels key={item.application_id} application={item} type='submitted' deleteApplication={this.deleteApplication} />
     );
        return (
            <>
          {this.state.chosen===null
            ? <Wrapper>
                <FormWrapper>
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
              <Application application={this.state.chosen} user = {this.props.user} clearChosen ={() =>this.updateChosen({})}/>
              </> 
              }
            </>
            );
          
        }

    };

