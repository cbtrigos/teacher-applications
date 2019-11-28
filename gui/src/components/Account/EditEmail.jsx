import React  from 'react';
import {H2, It, Input, Label, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import axios from 'axios';


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);


export default class EditEmail extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        email: this.props.user.email,
      }
    }
  
    updateEmail = () =>  {
        axios 
        .post('http://localhost:5000/api/change-email', {
            "email": this.state.email, 
            "prev_email": this.props.user.email,
            "user_id": this.props.user.user_id, 
            }) 
        .then(response => {
            if (response.data.message==="Email updated sucessfully") {
                this.setState({
                    error: response.data.message 
                })
            }
            else {
                this.setState({
                    error: response.data.message
                })
            }
    })
    }
  
    checkEmail = () => e => {
        if (this.state.email===this.props.user.email) {
          this.setState({
            error: 'No update to record'
          })
        }
        else if (!emailRegex.test(this.state.email) ) {
          this.setState({
            error: 'Please enter a valid email.'
          })
        }
        else if (window.confirm('Are you sure you wish to change your email? Press ok to continue.')) {
            this.updateEmail()
            this.setState({
                error: 'loading..'
            })
              }
    }
  
    handleChange = input => e => {
      const value = e.target.value
      this.setState({
            [input]: value    
        });
    }

    render() {
      return (
        <>
        {this.state.error!=='' && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <H2>Do you need to update your email?</H2> <br/>
          <Input small
            defaultValue= {this.state.email}
            onChange={this.handleChange('email')}
            type='text'
          />
          
        <br/><br/><br/><br/>
        <It> Please note: updating your email will disable you from changing it for the next 60 days. <br/>
        Your email is where you will receive all application updates. </It>
        <br/><br/>
  
        <CreateButton
          onClick={this.checkEmail()}
          type='submit'> Update email</CreateButton>
        </>
  
      )
    }
  
  }
  
  