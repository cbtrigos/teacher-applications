import React, { Component } from "react";
import {H2, H1, ErrorMessage, Application, Partition, Buttons, Bucket, InputLarge, Field, Input, New, CreateButton, Left} from '../../../constants/utils/Styling.jsx'
import {Select, FormControl, MenuItem, InputLabel} from "@material-ui/core/"

export default class RejectionForm extends Component {
    constructor(props) {
      super(props);
      const user = props.user
      this.state = {
        submitOkay:false, 
        checked: false,
        rejection: {
          rejection_reason: '',
          additional: '',
          approver_name: user.first_name + ' ' + user.last_name, 
          approver_id: user.user_id, 
          application_id: props.application.application_id, 
          user_id: user.user_id,
          signed: 'yes'
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
  submit = () => e => {
    const {rejection} = this.state
    let rej = ''
    if (rejection.rejection_reason ==="Other. I'll explain below:") {
        rej = rejection.additional
    }
    else (rej = rejection.rejection_reason + '. ' + rejection.additional)

    const application = {
        rejection_reason: rej,
        approver_id: rejection.approver_id, 
        approver_name: rejection.approver_name,
        application_id: rejection.application_id,
        signed: rejection.signed,
        email: rejection.email, 
        user_id: rejection.user_id
    }
    this.props.rejectApplication(application)

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
                <New style={{width:'96%'}}>
                <H2 label >Select a rejection reason * </H2>
                 <FormControl variant="outlined" style={{ width: "100%", height: "45px", backgroundColor: 'white', borderRadius:'5px' }}>
                    <InputLabel id="demo-simple-select-outlined-label">
                    </InputLabel>
                    <Select style={{ height: "45px"}}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={rejection.rejection_reason}
                        onChange={this.handleChangeSave('rejection_reason')}
                        >
                        <MenuItem value={"Certificate not attached"}><H2 left small>Certificate not attached</H2></MenuItem>
                        <MenuItem value={"Unauthenticated Certificate"}><H2 left small>Unauthenticated Certificate</H2></MenuItem>
                        <MenuItem value={"Wrong qualification"}><H2 left small>Wrong qualification</H2></MenuItem>
                        <MenuItem value={"Certificate number not indicated"}><H2 left small>Certificate number not indicated</H2></MenuItem>
                        <MenuItem value={"Wrong qualification"}><H2 left small>Wrong qualification</H2></MenuItem>
                        <MenuItem value={"Name Mismatches"}><H2 left small>Name Mismatches</H2></MenuItem>
                        <MenuItem value={"Date of birth discrepancy/mismatch"}><H2 left small>Date of birth discrepancy/mismatch</H2></MenuItem>
                        <MenuItem value={"Name Mismatches"}><H2 left small>Name Mismatches</H2></MenuItem>
                        <MenuItem value={"Unsigned ED Form"}><H2 left small>Unsigned ED Form</H2></MenuItem>
                       <MenuItem value="Other. I'll explain below:"><H2 left small>Other. I'll explain below:</H2></MenuItem>
                    </Select>
                </FormControl> 
                </New>
                <New style={{width:'96%'}}>
                <H2 label> Please enter any additional reasoning for the applicant: </H2>
                <InputLarge
                    name='additional'
                    noValidate
                    style= {{padding: '1em', width: '100%'}}
                    onChange={this.handleChangeSave('additional')}
                    defaultValue={''}
                />
                </New>
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
            <H2 left label>By checking this box, I verify that I have provided a descriptive reason as to why this application is being rejected.</H2>
            </New></Buttons>
            <Bucket>
                <H2 label left htmlFor="approver_name">Approver Name *</H2>
                <Field 
                    type = "text"
                    name="approver_name"
                    noValidate
                    disabled={true}
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
          {user.user_type===2 &&
          <>
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
                        defaultValue={rejection.signed}
                        />
            </Bucket>
            </>
          }
            </Partition>
            {rejection.approver_name==='' || rejection.rejection_reason==='' ||( rejection.rejection_reason==="Other. I'll explain below:" && rejection.additional==='')
            ? <ErrorMessage>All fields are required</ErrorMessage>
            :  rejection.rejection_reason==="Other. I'll explain below:" && (rejection.additional.length<10 || rejection.additional.length>150)
                ? <ErrorMessage>Please enter a descriptive reason for rejection between 10 and 150 characters.</ErrorMessage>
                : this.state.checked===false 
                    ? <ErrorMessage>Please check the above box.</ErrorMessage>
                    : <></>
            }

            <CreateButton 
                disabled={
                        rejection.approver_name==='' ||  
                        this.state.checked===false || 
                        rejection.rejection_reason==="" || 
                        (rejection.rejection_reason==="Other. I'll explain below:" &&
                        (rejection.additional.length<10||rejection.additional.length>150))
                    }
                onClick={this.submit()}>
                    Reject application #{application.application_id}
            </CreateButton>

            </Application>
          ) 
      }
  };
  
