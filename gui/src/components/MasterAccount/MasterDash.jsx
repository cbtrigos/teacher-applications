import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, HorizSeparator, It} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import ApproverPanels from './ApproverPanels.jsx';


export default class MasterDash extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        toApprove: [],
        serverMessage: '',
        rejection_reason: ''
      }
    } 
  
  async componentDidMount() {
  axios 
    .post('http://localhost:5000/api/get-all-opening-requests', 
      {"user_id": this.props.user.user_id, 
      "user_type": this.props.user.user_type
    }) 
    .then(response => {
      if (response.data==="error in getting requests") {
      throw new Error("Error in pulling opening requests") } 
      else {
        this.setState({ 
        toApprove: response.data.toApprove, 
        });
      }
    })
}

  approveOpening = (opening) => e => {
  if (window.confirm(`Are you sure you wish to approve job opening "${opening.title_proposed_appt}" at "${opening.school}"? Press ok to continue.`)) {
    this.setState({
      serverMessage: 'loading..',
    })
    axios 
    .post('http://localhost:5000/api/approve-opening', 
      { 
        "opening": opening,
        "user_type": this.props.user.user_type,
        "user_id": this.props.user.user_id, 
    }) 
    .then(response => {
      if (response.data === 'Success') {
        window.location.reload();
      } 
      else {
        this.setState({
          serverMessage: response.data
        })
      }
    })
    
    }
}
  rejectOpening = (opening) => e => { 
  if (window.confirm(`Are you sure you wish to reject job opening "${opening.title_proposed_appt}" at "${opening.school}"? Press ok to reject.`)) {
    this.setState({
      serverMessage: 'loading..'
    })
    axios 
    .post('http://localhost:5000/api/reject-opening', 
      { 
        "opening": opening,
        "rejection_reason": this.state.rejection_reason,
        "user_type": this.props.user.user_type,
        "user_id": this.props.user.user_id, 
    }) 
    .then(response => {
      if (response.data === 'Success') {
        window.location.reload();
      } 
      else {
        this.setState({
          serverMessage: response.data
        })
      }
    })
    
    }
}
updateReason = (reason) => e => { 
    this.setState({
      rejection_reason: e.target.value
    })
}


    render() {
      const user = this.props.user
      const toDos = this.state.toApprove.map(item => 
            <ApproverPanels
              key={item.user_id} 
              user = {user}
              application={item} 
              serverMessage = {this.state.serverMessage}
              updateReason = {this.updateReason}
              approveOpening = {this.approveOpening}
              rejectOpening = {this.rejectOpening}
              rejection_reason = {this.state.rejection_reason}
              />
      );
        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Welcome master user, {user.first_name}</H1>
                <H2>From this portal, you have the ability to review and approve requests 
                  to post new job openings as well as peruse all users, applications, and schools.<br/>
                  Start below by approving any requests. Then, use the explore menu above to explore data. <br/><br/>
                  Good luck!</H2>
                </FormWrapper>
                <br/> <br/>
                <FormWrapper large>
                <H1>Job Opening Requests to Approve</H1>
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
  
  




