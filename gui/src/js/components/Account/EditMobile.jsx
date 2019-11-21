import React  from 'react';
import {H2, Input, It, ErrorMessage, CreateButton} from '../../constants/utils/Styling.jsx'
import axios from 'axios';
import NumberFormat from 'react-number-format';


export default class EditMobile extends React.Component {
    constructor(props) {
      super(props)
      this.state= {
        error: '',
        mobile_number: this.props.user.mobile_number,
      }
    }
  
    updateMobile = () =>  {
        axios 
        .post('http://localhost:5000/api/change-mobile', {
            "mobile_number": this.state.mobile_number, 
            "prev_mobile_number": this.props.user.mobile_number,
            "user_id": this.props.user.user_id, 
            }) 
        .then(response => {
            if (response.data.message==="Mobile number updated sucessfully") {
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
  
    checkMobile = () => e => {
        if (this.state.mobile_number===this.props.user.mobile_number) {
          this.setState({
            error: 'No update to record'
          })
        }
        else if ((this.state.mobile_number).includes('*')) {
          this.setState({
            error: 'Please enter a valid mobile number.'
          })
        }
        else if (window.confirm('Are you sure you wish to update your mobile number? Press ok to continue.')) {
            this.updateMobile()
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
        <H2>Do you need to update your mobile number?</H2> <br/>
            <NumberFormat 
                customInput={Input} 
                style={{
                    width:'40%', 
                    minWidth:'200px',
                    textAlign: 'center',
                    margin: 'auto',
                    display: 'block'}}
                format="+232 ## ######" 
                name="mobile_number"
                mask="*"
                value={this.state.mobile_number} 
                onChange={this.handleChange('mobile_number')}
                />
          
          <br/><br/><br/><br/>
        <It> Please note: updating your mobile number will disable you from changing it for the next 30 days. <br/> </It>
        <br/><br/>
  
  
        <CreateButton
          onClick={this.checkMobile()}
          type='submit'> Update Mobile Number</CreateButton>
        </>
  
      )
    }
  
  }
  
  