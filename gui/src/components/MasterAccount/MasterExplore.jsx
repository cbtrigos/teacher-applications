import React  from 'react';
import {H2, H1, Wrapper, Field, FormWrapper, Notification,  Input, Application, Buttons, HorizSeparator, It, CreateButton} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import AllUsers from './SearchUsers.jsx'
import AllApps from './SearchApps.jsx'
import AllOpenings from './SearchOpenings.jsx'
import ScrollableAnchor from 'react-scrollable-anchor'
import Fuse from "fuse.js";
import { CircularProgress } from '@material-ui/core';

var searchUsers = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "first_name",
    "last_name",
    "email",
    "mobile_number",
    "created",
    'birth_date',
    "modified",
    "user_id",
    "gender",
    "user_type"
  ]
};

var searchApps = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "user_id",
    "job_opening",
    "application_id",
    "submitted",
    "created",
    'school_name',
    "nationality",
    "pin_code",
    "nassit",
    "qualifications",
    "special_skills",
    "prev_appt",
    "national_id",
    "naitonality",
    "approver_1",
    "approver_2",
    "approver_1_decision",
    "approver_2_decision",
    "school_district",
    "certificates",
    "rejection_reason",
    "last_edited",

  ]
};

var searchOpenings = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "emis_code",
    "school",
    "school_type",
    "reviewed",
    'contact_email',
    'contact_mobile',
    'contact_title',
    'contact_name',
    "title_proposed_appt",
    'date_proposed_appt',
    "district",
    'grade_requested',
    "qualifications_required",
    'reasons_proposed_appt',
    "grade_requested",
    "rejection_reason",
    "opening_key",
    "live",
    "pupil_enrollment",
    "number_of_teachers",
    "on_payroll",
    "tq_JSS",
    "tq_SSS",
    "tq_primary",
    "tq_primary",
    "opening_additional_info",
    "teacher_id_allocated",
    'opening_key',
    "opening_created",
    'closed',
  ]
};

export default class MasterExplore extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        users: [],
        applications: [],
        openings: [],

        chosenUsers: [],
        chosenOpenings: [],
        chosenApplications: [],
        
        searchedOpening: '',
        openingLoading: false,

        selectedUser: {},
        userLoading: false,
        searchedUser: '',
        selectedOpening: {},
        selectedApp: {},

        loadingPage: false,
        serverUserMessage: '',
        serverOpeningMessage: '',
      }
    }
  
    async componentDidMount() {
      this.setState({ 
        loadingPage: true
       });
      axios 
       .post(process.env.REACT_APP_API+'/api/get-all-applications', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="failed to pull applications") {
          throw new Error("Error in pulling application information") } 
         else {
          this.setState({
            applications: response.data.applications,
            chosenApplications: response.data.applications,
          })
         }
       })
       axios 
       .post(process.env.REACT_APP_API+'/api/get-all-users', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="failed to pull users") {
          throw new Error("Error in pulling user information") } 
         else {
          this.setState({
            users: response.data.users,
            chosenUsers: response.data.users
          })
         }
       })
       axios 
       .post(process.env.REACT_APP_API+'/api/get-all-openings', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="failed to pull openings") {
          throw new Error("Error in pulling opening information") } 
         else {
          this.setState({
            openings: response.data.openings,
            chosenOpenings: response.data.openings,
            loadingPage: false 
          })
         }
       })

 }


  handleUsersSearch = input => e => {
    var fuse = new Fuse(this.state.users, searchUsers); // "list" is the item array
    const value = e.target.value
    if (value !==''){
      let results = fuse.search(value)
      this.setState({
        chosenUsers: results
      })
    }
    else 
    this.setState({
      chosenUsers: this.state.users
    })
  }
  handleAppsSearch = input => e => {
    var fuse = new Fuse(this.state.applications, searchApps); // "list" is the item array
    const value = e.target.value
    if (value !==''){
      let results = fuse.search(value)
      this.setState({
        chosenApplications: results
      })
    }
    else 
    this.setState({
      chosenApplications: this.state.applications
    })
  }
  handleOpeningsSearch = input => e => {
    var fuse = new Fuse(this.state.openings, searchOpenings); // "list" is the item array
    const value = e.target.value
    if (value !==''){
      let results = fuse.search(value)
      this.setState({
        chosenOpenings: results
      })
    }
    else 
    this.setState({
      chosenOpenings: this.state.openings
    })
  }
  modifyUser = input => e => {
    this.setState({ 
      selectedUser: {}, 
      searchedUser: e.target.value,
      userLoading: true
     });
    axios 
       .post(process.env.REACT_APP_API+'/api/get-user', 
         { 
           "searched": e.target.value, 
           "user_type": this.props.user.user_type,
           "user_id": this.props.user.user_id, 
       }) 
       .then(response => {
         if (response.data==="error in pulling information") {
          this.setState({
            serverUserMessage: response.data
          })
        } 
         else {
           this.setState({ 
            selectedUser: response.data.selectedUser, 
            searchedUser: '',
            userLoading: false
           });
         }
       })
  }
  modifyOpening = input => e => {
    this.setState({ 
      selectedOpening: {}, 
      searchedOpening: e.target.value,
      openingLoading: true
     });
    axios 
       .post(process.env.REACT_APP_API+'/api/get-opening', 
         { 
           "searched": e.target.value, 
           "user_type": this.props.user.user_type,
           "user_id": this.props.user.user_id, 
       }) 
       .then(response => {
         if (response.data==="error in pulling information") {
          this.setState({
            serverOpeningMessage: response.data
          })
        } 
         else {
           this.setState({ 
            selectedOpening: response.data.selectedOpening, 
            searchedOpening: '',
            openingLoading: false
           });
         }
       })
  }
  updateType = (id, type, type_val) => e => {
    if (window.confirm(`Are you sure you wish to modify user ${id} to a ${type} user? Press ok to continue.`)) {
      if (type==='Master') {
        if (!window.confirm(`A master user type can make ANY changes. Are you super duper sure you want to do this? Press ok to continue.`)) {
          return 
        }
      }
      axios 
        .post(process.env.REACT_APP_API+'/api/update-user', 
          { 
            "changed_id": id, 
            "type": type_val,
            "user_type": this.props.user.user_type,
            "user_id": this.props.user.user_id, 
        }) 
        .then(response => {
          if (response.data ==='User is already that type') {
            this.setState({
              serverUserMessage: response.data
            })
          } 
          else if (response.data === 'Success') {
            window.location.reload();
          }
        })
  }
  }
  updateOpening = (id, type, type_val) => e => {
    var string = '' 
    {type_val===false 
      ? string = `Are you sure you want to remove opening ${id} from being live? No one will be able to continue applying for it. Press ok to continue. `
      : string = `Are you sure you want to make opening ${id} live? It will immediately become public for anyone to apply to. Press ok to continue. `}
    if (window.confirm(string)) {
      axios 
        .post(process.env.REACT_APP_API+'/api/update-opening', 
          { 
            "opening_key": id, 
            "type": type_val,
            "user_type": this.props.user.user_type,
            "user_id": this.props.user.user_id, 
        }) 
        .then(response => {
          if (response.data ==='Opening is already that type') {
            this.setState({
              serverOpeningMessage: response.data
            })
          } 
          else if (response.data === 'Success') {
            window.location.reload();
          }
        })
  }
  }
    render() {
      const user = this.props.user
      const {selectedUser, selectedOpening} = this.state
      const userTable = <AllUsers users={this.state.chosenUsers}/>
      const applicationTable = <AllApps applications={this.state.chosenApplications}/>
      const openingsTable = <AllOpenings openings={this.state.chosenOpenings}></AllOpenings>
        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Welcome to the exploration page, {user.first_name}!</H1>
                {this.state.loadingPage && <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div> }
                <H2>You're in the right place to explore the {this.state.users.length} <a style={{color:"#EB7BC0"}} href='#users'>users</a>, {this.state.openings.length} <a style={{color:"#EB7BC0"}} href='#openings'>job openings</a>, and {this.state.applications.length} <a style={{color:"#EB7BC0"}} href='#applications'>applications</a>.</H2>          

              </FormWrapper>
                 <br/> <br/>
            <ScrollableAnchor id={'users'}>
            <FormWrapper large>
              <H1> All Users</H1>
              <HorizSeparator/>
              <Field
                style = {{textAlign: 'center'}}
                type = "text"
                name="search"
                noValidate
                placeholder="Filter by any of the listed fields.."
                onChange={this.handleUsersSearch('search')}
              />
            {userTable}
            <HorizSeparator/>
            <H1>Modify Privileges</H1>
            <Input
              style = {{textAlign: 'center'}}
              type = "text"
              name="search"
              noValidate
              placeholder="Search by exact user ID"
              onChange={this.modifyUser('search')}
            />
            
            {Object.keys(selectedUser).length!== 0
              ? 
              <Application>
              <H2>One user was found:<br/><br/>
              First Name: <span style={{fontStyle:"italic"}}>{selectedUser.first_name}</span> <br/>
              Last Name: <span style={{fontStyle:"italic"}}>{selectedUser.last_name}</span> <br/>
              User ID: <span style={{fontStyle:"italic"}}>{selectedUser.user_id}</span> <br/>
              User Type: <span style={{fontStyle:"italic"}}>{selectedUser.user_type} ({
                selectedUser.user_type===0 ? <>Applicant Type</> : 
                selectedUser.user_type===1 ? <>TSC Teacher Management Representative</> :
                selectedUser.user_type===2 ? <>TSC Chair</> :
                selectedUser.user_type===3 ? <>Not used anymore</> :
                selectedUser.user_type===4 ? <>Unauthenticated Approver</> :
                selectedUser.user_type===5 ? <>Master User</> : <>unknown type..</>
                })</span>
              </H2><br/>
              <H2 >Would you like to modify privileges? <br/><b>Ensure this is the correct user before proceeding.</b> </H2> <br/>
                {this.state.serverUserMessage!=='' && <Notification>{this.state.serverUserMessage}</Notification>}
                <Buttons>
                  <CreateButton
                    onClick={this.updateType(selectedUser.user_id, 'Master', 5)}
                    >
                    Make a Master User (Type 5)
                  </CreateButton>
                  <CreateButton
                    onClick={this.updateType(selectedUser.user_id, 'TSC Chair', 2)}
                  >
                    Make a TSC Chair (Type 2)
                  </CreateButton>
                </Buttons>
                <Buttons>
                <CreateButton
                    onClick={this.updateType(selectedUser.user_id, 'TSC Representative', 1)}
                  >
                    Make a TSC Representative (Type 1)
                  </CreateButton>
                  <CreateButton
                    onClick={this.updateType(selectedUser.user_id, 'Applicant', 0)}
                  >
                    Revert to a Applicant (Type 0)
                  </CreateButton>
                </Buttons>
            </Application>
              : this.state.searchedUser && <div style={{display:'flex', justifyContent:'center'}}><CircularProgress/></div> 
               }
            
            </FormWrapper>
            </ScrollableAnchor>
            <br/> <br/>
            <ScrollableAnchor id={'openings'}>
            <FormWrapper large>
              <H1> All Job Openings</H1>
              <HorizSeparator/>
              <Field
                style = {{textAlign: 'center'}}
                type = "text"
                name="search"
                noValidate
                placeholder="Filter by any of the listed fields.."
                onChange={this.handleOpeningsSearch('search')}
              />
            {openingsTable}
            <HorizSeparator/>
            <H1>Modify a Job Opening</H1>
            <Input
              style = {{textAlign: 'center'}}
              type = "text"
              name="search"
              noValidate
              placeholder="Search by exact opening ID"
              onChange={this.modifyOpening('search')}
            />
            
            {Object.keys(selectedOpening).length!== 0
              ?
              <Application>
              <H2>One opening was found:<br/><br/>
              Job Opening ID: <span style={{fontStyle:"italic"}}>{selectedOpening.opening_key}</span> <br/>
              Contact Name: <span style={{fontStyle:"italic"}}>{selectedOpening.contact_name}</span> <br/>
              School: <span style={{fontStyle:"italic"}}>{selectedOpening.school}</span> <br/>
              Proposed Appointment: <span style={{fontStyle:"italic"}}>{selectedOpening.title_proposed_appt}</span> <br/>
              Already reviewed:  <span style={{fontStyle:"italic"}}>{selectedOpening.reviewed}</span> <br/>
              Currently Live: <span style={{fontStyle:"italic"}}>{selectedOpening.live} </span>
              </H2><br/>
              <H2 >Would you like to modify this opening? <br/><b>Ensure this is the correct job opening before proceeding.</b> </H2> <br/>
                {this.state.serverOpeningMessage!=='' && <Notification>{this.state.serverOpeningMessage}</Notification>}
                <Buttons>
                  <CreateButton
                    onClick={this.updateOpening(selectedOpening.opening_key, 'live', 'false')}
                    >
                    Remove from being live 
                  </CreateButton>
                  <CreateButton
                    onClick={this.updateOpening(selectedOpening.opening_key, 'live', 'true')}
                  >
                    Make live
                  </CreateButton>
                </Buttons>
            </Application>
              : this.state.searchedOpening && <div style={{display:'flex', justifyContent:'center'}}><CircularProgress/></div> 
            }
            
            </FormWrapper>
            </ScrollableAnchor>
            <br/> <br/>
            <ScrollableAnchor id={'applications'}>
              <FormWrapper large>
            <H1> All Applications</H1>
            <HorizSeparator/>
            <Field
              style = {{textAlign: 'center'}}
              type = "text"
              name="search"
              noValidate
              placeholder="Filter by any of the listed fields.."
              onChange={this.handleAppsSearch('search')}
              />
            {applicationTable}
            </FormWrapper>
            </ScrollableAnchor>
                </Wrapper>
    
      )
    }
  
  }
  
  




