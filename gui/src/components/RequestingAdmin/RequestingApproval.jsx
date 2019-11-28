import React  from 'react';
import {H2, H1, Wrapper, FormWrapper, Div, Category, It} from '../../constants/utils/Styling.jsx'
import axios from 'axios';


export default class RequestingApproval extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        approverRequest: {
            created: '', 
            school_name: '',
            title: '',
            emis_code: ''
        }
      }
    }
    async componentDidMount() {
        axios 
         .post('http://localhost:5000/api/get-my-approver-request', 
           {"user_id": this.props.user.user_id, 
           "user_type": this.props.user.user_type
         }) 
         .then(response => {
           if (response.data==="error in getting applications") {
            throw new Error("Error in pulling application information") } 
           else {
             this.setState({ 
               approverRequest: response.data.approverRequest, 
             });
           }
         })
   }
  
    render() {
        const {user} = this.props
        const {school_name, emis_code, title, created} = this.state.approverRequest
        const created_date = created.slice(8,10)+'/' +created.slice(5,7) +'/' + created.slice(0,4)

        return (
            <Wrapper>
            <FormWrapper large>
                <H1>Hi, {user.first_name}</H1>
                <H2>Welcome to your temporary dashboard! <br/>
                Once you get authorized, you will be able to view and approve applications. 
                    Until then, please wait patiently. <br/>
                    <br/>
                For your records, you have registered with the following admin information: 
                <Div>
                    <Category>Title: </Category>
                        <It>{title}</It>
                </Div>
                <Div>
                    <Category>School Name: </Category>
                        <It>{school_name}</It>
                </Div>
                <Div>
                    <Category> EMIS Code: </Category>
                        <It>{emis_code}</It>
                </Div>
                <Div>
                    <Category> Date request was made: </Category>
                    <It>{created_date}</It>
                </Div>
                </H2>
                </FormWrapper>
                </Wrapper>
    
      )
    }
  
  }
  
  




