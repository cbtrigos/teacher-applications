import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, HorizSeparator, It} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import AllUsers from './SearchUsers.jsx'
import AllApps from './SearchApps.jsx'


export default class MasterExplore extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        users: [],
        applications: [],
        search: '',

      }
    }
  
    async componentDidMount() {
      axios 
       .post('http://localhost:5000/api/get-all-applications', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="failed to pull applications") {
          throw new Error("Error in pulling application information") } 
         else {
          this.setState({
            applications: response.data.applications
          })
         }
       })
       axios 
       .post('http://localhost:5000/api/get-all-users', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="failed to pull users") {
          throw new Error("Error in pulling application users") } 
         else {
          this.setState({
            users: response.data.users
          })
         }
       })

 }

 getUserTable = input => e => {
   console.lot('in here')
   return allUsers(input)
 }

 handleChangeSave = input => e => {
  this.setState({
    [input] : e.target.value
  })
}

    render() {
      const user = this.props.user
      const userTable = <AllUsers users={this.state.users}/>
      const applicationTable = <AllApps applications={this.state.applications}/>

        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Welcome to the exploration page, {user.first_name}!</H1>
                <H2>You're in the right place to explore the {this.state.users.length} users and {this.state.applications.length} applications.</H2>          

            </FormWrapper>
                <br/> <br/>
            <FormWrapper large>
              <H1> All Users</H1>
              <HorizSeparator/>
              {/* <Field 
              type = 'text'
              placeholder= 'search..'
              value = {this.state.search}
              onChange={this.handleChangeSave('search')}
              /> */}
            {userTable}
            </FormWrapper>
            <br/> <br/>
            <FormWrapper large>
            <H1> All Applications</H1>
            <HorizSeparator/>

            {applicationTable}
            </FormWrapper>
                </Wrapper>
    
      )
    }
  
  }
  
  




// search bar to search through users & applications 