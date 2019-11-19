import React, { Component } from "react";
import {H1, A, H2, It, HorizSeparator, Wrapper, FormWrapper} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import styled from "styled-components";
import Application from "./Application.jsx"
import DraftPanels from './ApplicationPanels.jsx'
import SubmittedPanels  from './ApplicationPanels.jsx'


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
    console.log('getting all applications')
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
  deleteApplication = (input) => {
    axios 
      .post('http://localhost:5000/api/delete-application', 
        {"application_id": input
      }) 
      .then(response => {
        if (response.data==='application deleted successfully') {
          console.log(response.data)
        } else {console.log(response.data)}
      })
      window.location.reload();
  }

  render() {
    const user = this.props.user
    const startApp = <A href='new-application'>here</A>;
    const drafts = this.state.currentApps.map(item => 
          <DraftPanels key={item.application_id} application={item} type='draft' updateChosen={this.updateChosen} deleteApplication={this.deleteApplication}/>
          );
    const submitted = this.state.submittedApps.map(item =>
      <SubmittedPanels key={item.application_id} application={item} type='submitted' deleteApplication={this.deleteApplication} />
     );
    console.log(this.state.submittedApps)
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