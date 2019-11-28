import React, { Component } from "react";
import {H2, H1, ErrorMessage, Application, Partition, Buttons, Bucket, InputLarge, Field, Input, New, CreateButton, Left} from '../../../constants/utils/Styling.jsx'

export default class RejectionForm extends Component {
    constructor(props) {
      super(props);
      const user = props.user
      this.state = {
        submitOkay:false, 
        checked: false,
        rejection: {
          rejection_reason: '',
          approver_name: '', 
          approver_id: user.user_id, 
          application_id: props.application.application_id, 
          signed: 'yes', 
          email: user.email,
          user_id: user.user_id
        }
        
  };
   }
   getToday = e => {
    var day = new Date();
    var thisDate = day.getDate();
    var thisMonth = day.getMonth()+1;
    var thisYear = day.getFullYear();
    if(thisDate<10){
        thisDate='0'+thisDate;
    } 
    if(thisMonth<10){
        thisMonth='0'+thisMonth;
    } 
    return thisMonth+'/'+thisDate+'/'+ thisYear
  }



   handleChangeSave = input => e => {
    const value = e.target.value
    if (input==='checked') {
        this.setState({
            checked: e.target.checked
        })
    }
    else 
        {this.setState(prevState => ({
        rejection: {                 
            ...prevState.rejection, 
            [input]: value    
        }
        }))}
    
    }



  
    render() {
      const { application, user, rejectApplication} = this.props;
      const {rejection} = this.state
      const today = this.getToday()
      const birth = this.props.user.birth_date
      const birth_date = birth.slice(8,10)+'/' +birth.slice(5,7) +'/' + birth.slice(0,4)
  
          return (
            <Application>
            <Partition>
                <H1>Rejection Petition for #{application.application_id}</H1><br/>
                <InputLarge
                name='rejection_reason'
                noValidate
                style={{margin:'1em'}}
                onChange={this.handleChangeSave('rejection_reason')}
                defaultValue={rejection.rejection_reason}
                />
            <Buttons>
            <Left style={{minWidth: '2%', width: '4%',  margin: '1.5%',display: 'flex', justifyContent: 'center', alignItems:'center' }}>
            <input 
              type="checkbox"
              checked={this.state.checked}
              id='checked'
              onChange={this.handleChangeSave('checked')}
              />
            </Left>
            <New>
            <H2 left>By checking this box, I verify that I have provided a descriptive reason as to why this application is being rejected.</H2>
            </New></Buttons>
            <Bucket>
                <H2 label left htmlFor="approver_name">Approver Name *</H2>
                <Field 
                    type = "text"
                    name="approver_name"
                    noValidate
                    onChange={this.handleChangeSave('approver_name')}
                    defaultValue={rejection.approver_name}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date">Date*</H2>
                <Field
                    name="date"
                    noValidate
                    disabled= {true}
                    defaultValue={today}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="birth_date">Birth Date *</H2>
                <Field
                    name="birth_date"
                    noValidate
                    disabled= {true}
                    defaultValue={birth_date}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date">Signature *</H2>
                <Field
                    name="signature"
                    noValidate
                    disabled= {true}
                    defaultValue={rejection.signature}
                    />
          </Bucket>

            </Partition>
            {rejection.approver_name==='' || rejection.rejection_reason==='' 
            ? <ErrorMessage>All fields are required</ErrorMessage>
            : rejection.rejection_reason.length<10 || rejection.rejection_reason.length>150
                ? <ErrorMessage>Please enter a descriptive reason for rejection between 10 and 150 characters.</ErrorMessage>
                : this.state.checked===false 
                    ? <ErrorMessage>Please check the above box.</ErrorMessage>
                    : <></>
            }

            <CreateButton 
                disabled={rejection.approver_name==='' ||  this.state.checked===false || rejection.rejection_reason.length<10 || rejection.rejection_reason.length>150}
                onClick={() => rejectApplication(rejection)}>
                    Reject application #{application.application_id}
            </CreateButton>

            </Application>
          ) 
      }
  };
  
