import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, HorizSeparator, It} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import PanelContent from './Panels.jsx'


export default class MasterDash extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        toApprove: []
      }
    }
  
    async componentDidMount() {
      axios 
       .post('http://localhost:5000/api/get-all-approver-requests', 
         {"user_id": this.props.user.user_id, 
         "user_type": this.props.user.user_type
       }) 
       .then(response => {
         if (response.data==="error in getting applications") {
          throw new Error("Error in pulling application information") } 
         else {
           this.setState({ 
            toApprove: response.data.toApprove, 
           });
         }
       })
 }

    render() {
      console.log(this.state)
      const user = this.props.user
      const toDos = this.state.toApprove.map(item => 
            <PanelContent 
              key={item.user_id} 
              user = {user}
              application={item} 
              // approveApplication = {this.approveApplication}
              // rejectApplication = {this.rejectApplication}
              />
      );
        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Welcome master user, {user.first_name}</H1>
                <H2>From this portal, you have the ability to review and approve requests 
                  for Admin access (as application approvers) as well as peruse all users, applications, and schools.<br/>
                  Start below by approving any requests. Then, use the dashboard drop-down menu above to explore data. <br/>
                  Good luck!</H2>
                </FormWrapper>
                <br/> <br/>
                <FormWrapper large>
                <H1>Admin Requests to Approve</H1>
                    <div>
                    <HorizSeparator/>
                      <div>
                        {toDos}
                        {this.state.toApprove.length===0 && <It> No applications to approve. All done!</It>}
                      </div>
                      </div>
                </FormWrapper>
                </Wrapper>
    
      )
    }
  
  }
  
  




