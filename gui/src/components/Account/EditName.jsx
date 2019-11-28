import React  from 'react';
import {H2, It, Input, Label, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import axios from 'axios';

export default class EditName extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
      }
      this.updateName = this.updateName.bind(this)
      this.checkName = this.checkName.bind(this)
    }
  
    updateName = () => {
      event.preventDefault();
      axios 
      .post('http://localhost:5000/api/change-name', 
        { "first_name": this.state.first_name, 
          "last_name": this.state.last_name, 
          "user_id": this.props.user.user_id, 
          "prev_first_name": this.props.user.first_name, 
          "prev_last_name": this.props.user.last_name
      }) 
      .then(response => {
        if (response.data.message==="Name updated sucessfully.") {
         this.setState({
           error: response.data.message + "Please log out and back in to reflect updates."
         })
        } 
        else {
          this.setState({
            error: response.data.message
          })
        }
      })
    }
  
    checkName = () => e => {
        if (this.state.first_name===this.props.user.first_name && this.state.last_name===this.props.user.last_name) {
          this.setState({
            error: 'No update to record'
          })
        }
        else if (this.state.first_name.length<2 || this.state.last_name.length<2) {
          this.setState({
            error: 'Both first and last names need at least 2 characters.'
          })
        }
        else if (window.confirm('Are you sure you wish to change your name? Press ok to continue.')) {
            this.updateName()
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
        <H2>Do you need to update your name?</H2>
        <H2>First name</H2> 
          <Input small
            defaultValue= {this.state.first_name}
            onChange={this.handleChange('first_name')}
            type='text'
          /><br/>
        <H2>Last name</H2>
          <Input small
            defaultValue= {this.state.last_name}
            onChange={this.handleChange('last_name')}
            type='text'
          />
        <br/><br/><br/><br/>
        <It>Please note: updating your name will disable you from changing it for the next 60 days. </It>
        <br/><br/>
  
        <CreateButton
          onClick={this.checkName()}
          type='submit'> Update name </CreateButton>
        </>
  
      )
    }
  
  }
  
  