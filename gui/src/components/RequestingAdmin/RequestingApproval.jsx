import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, Div, Category, It} from '../../constants/utils/Styling.jsx'
import axios from 'axios';


export default class RequestingApproval extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        user: this.props,
        openingRequests: [],
        approvedRequests: []
      }
    }
    async componentDidMount() {
        axios 
         .post(process.env.REACT_APP_API+'/api/get-my-opening-request', 
           {"user_id": this.props.user.user_id, 
           "user_type": this.props.user.user_type
         }) 
         .then(response => {
           if (response.data==="error in getting applications") {
            throw new Error("Error in pulling application information") } 
           else {
             this.setState({ 
              openingRequests: response.data.openingRequests, 
              approvedRequests: response.data.approvedRequests
             });
           }
         })
   }
  
    render() {
        const {user} = this.props
        // const {school_name, emis_code, title, created} = this.state.approverRequest
        // const created_date = created.slice(8,10)+'/' +created.slice(5,7) +'/' + created.slice(0,4)

        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Hi, {user.first_name}</H1>
                <H2>Welcome to your dashboard! <br/> <br/>
                    
                <H2>If you wish to submit a job opening to go live on the site, you can do so using the menu bar above.</H2><br/><br/>
                If you already have submitted one, please wait patiently as it gets reviewed. You will recieve an email notification with any decisions.

                </H2>
                </FormWrapper>
                </Wrapper>
    
      )
    }
  
  }
  
  




