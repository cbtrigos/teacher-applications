import React  from 'react';
import {H2, Input,  ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';


const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");


export default class ChangePassword extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        currentPassword: '',
        newPassword: '',
        passwordConfirm: ''
      }
    }
  
    updatePassword = () =>  {
        axios 
        .post('http://localhost:5000/api/change-password', {
            "password": this.state.newPassword, 
            "current_password": this.state.currentPassword,
            "user_id": this.props.user.user_id, 
            }) 
        .then(response => {
            if (response.data.message==="Password updated sucessfully") {
                this.setState({
                    error: response.data.message 
                })
            }
            else {
                this.setState({
                    error:response.data.message
                })
            }
    })
    }
  
    checkPassword = () => e => {
        if (this.state.currentPassword==='' || this.state.newPassword==='' || this.state.passwordConfirm==='') {
            this.setState({
                error: 'Please fill out all fields'
              })
        }
        else if (this.state.newPassword!==this.state.passwordConfirm) {
          this.setState({
            error: 'Passwords do not match'
          })
        }
        else if (this.state.newPassword===this.state.currentPassword) {
          this.setState({
            error: 'Please enter a different password than your current one.'
          })
        }
        else if (!passwordRegex.test(this.state.newPassword) ) {
          this.setState({
            error: 'Please enter a valid password with at least one of each of the following: 6 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
          })
        }

        else if (window.confirm('Are you sure you wish to change your password? Press ok to continue.')) {
            this.updatePassword()
            this.setState({
                error: 'loading'
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
        {this.state.error==='loading' 
        ?   <div style={{display:'flex', justifyContent:'center'}}><CircularProgress /></div>
        : this.state.error!=='' && <ErrorMessage>{this.state.error}</ErrorMessage>}
        
        <H2>Would you like to change your password?</H2>
        <H2 >Current password</H2>
          <Input small
            type='password'
            onChange={this.handleChange('currentPassword')}
          />
        <H2>New password</H2>
          <Input small
            type='password'
            onChange={this.handleChange('newPassword')}
          />
        <H2>Confirm new password</H2>
          <Input small
            type='password'
            onChange={this.handleChange('passwordConfirm')}
          />
          
        <br/><br/><br/><br/>
  
        <CreateButton
          onClick={this.checkPassword()}
          type='submit'> Update password</CreateButton>
        </>
  
      )
    }
  
  }
  
  