import React, { Component } from "react";
import axios from 'axios';
import {A, H2, H1, Application, ErrorMessage, Partition, Field, Bucket, InputLarge, CreateButton} from '../../../constants/utils/Styling.jsx'


export default class Approver1Form extends Component {
  constructor(props) {
    super(props);
    const {user, application} = this.props
    this.state = {
      submitOkay:false, 
      errors: 'All fields are required.',
      application: {
        approver_id: user.user_id, 
        user_id: application.user_id,
        application_id: application.application_id, 
        school_id: '',                
        title_proposed_appt: '',        
        date_proposed_appt: '',         
        reasons_proposed_appt: '',      
        current_pupil_enrollment: '',   
        on_payroll: '',            
        JSS_level_qualified: '', 
        SSS_level_qualified: '',  
        approver_1_name: '',  
        signed: 'yes', 
        mobile_number: user.mobile_number, 
        email: user.email,
      }, 
      formErrors: {
        school_id: '',                     
        date_proposed_appt: '',         
        approver_1_name: '',  
        signed: '', 
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
    this.setState(prevState => ({
      application: {                 
          ...prevState.application, 
          [input]: value    
      }
    }))
    let formErrors = { ...this.state.formErrors };
    switch (input) {
      case "date_proposed_appt":
        var today = new Date();
        var given = new Date(value)
        
        formErrors.date_proposed_appt =
        today >= given 
        ? "You must choose a date in the future" 
        : (value.length> 10)
          ? "You must choose a date in the near future" 
          : "";

      break;
    }
    this.setState({ formErrors, [name]: value });
    let err=''
    Object.values(formErrors).forEach(val => {
      if (val!=='') {
        err= 'Please fix the above errors.'
      }
    })
    if (err==='')
      {Object.values(this.state.application).forEach(val => {
        if (val==='') {
          err='All fields are required.'
        }
      })}
      this.setState({
        errors:err
      })
    }


  render() {
    const today = this.getToday()
    const birth = this.props.user.birth_date
    const birth_date = birth.slice(8,10)+'/' +birth.slice(5,7) +'/' + birth.slice(0,4)

    const {approveApplication} = this.props;
    const {application, formErrors, errors} = this.state
    const handleChangeSave = this.handleChangeSave
        return (
          <Application>
          <Partition>
          <H1>Approval Petition for #{application.application_id} </H1>
          <Bucket>
                <H2 label left htmlFor="school_id">School ID (SID) *</H2>
                <Field
                    type = "number"
                    name="school_id"
                    noValidate
                    onChange={handleChangeSave('school_id')}
                    defaultValue={application.school_id}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="title_proposed_appt">Title of Proposed Appointment *</H2>
                <Field
                    type = "text"
                    name="title_proposed_appt"
                    noValidate
                    onChange={handleChangeSave('title_proposed_appt')}
                    defaultValue={application.title_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date_proposed_appt">Date of Proposed Appointment *</H2>
                <Field
                    type = "date"
                    name="date_proposed_appt"
                    noValidate
                    onChange={handleChangeSave('date_proposed_appt')}
                    defaultValue={application.date_proposed_appt}
                    />
                {formErrors.date_proposed_appt!=='' && <ErrorMessage>{formErrors.date_proposed_appt}</ErrorMessage>}
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="reasons_proposed_appt">Reasons for Proposed Appointment *</H2>
                <Field
                    type = "text"
                    name="reasons_proposed_appt"
                    noValidate
                    onChange={handleChangeSave('reasons_proposed_appt')}
                    defaultValue={application.reasons_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="current_pupil_enrollment">Current Pupil Enrollment *</H2>
                <Field
                    type = "number"
                    name="current_pupil_enrollment"
                    noValidate
                    onChange={handleChangeSave('current_pupil_enrollment')}
                    defaultValue={application.current_pupil_enrollment}
                    />
          </Bucket>
         
          <Bucket>
                <H2 label left htmlFor="on_payroll">Number of Teachers on Payroll *</H2>
                <Field
                    type = "number"
                    name="on_payroll"
                    noValidate
                    onChange={handleChangeSave('on_payroll')}
                    defaultValue={application.on_payroll}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="JSS_level_qualified">Trained and Qualified (TQ) for JSS Level *</H2>
                <Field
                    type = "number"
                    name="JSS_level_qualified"
                    noValidate
                    onChange={handleChangeSave('JSS_level_qualified')}
                    defaultValue={application.JSS_level_qualified}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="SSS_level_qualified">Trained and Qualified (TQ) for SSS Level *</H2>
                <Field
                    type = "number"
                    name="SSS_level_qualified"
                    noValidate
                    onChange={handleChangeSave('SSS_level_qualified')}
                    defaultValue={application.SSS_level_qualified}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="mobile_number">Mobile Number *</H2>
                <Field 
                    type = "text"
                    name="mobile_number"
                    noValidate
                    disabled={true}
                    defaultValue={application.mobile_number}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="approver_1_name">Approver Name *</H2>
                <Field 
                    type = "text"
                    name="approver_1_name"
                    noValidate
                    onChange={handleChangeSave('approver_1_name')}
                    defaultValue={application.approver_1_name}
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
                    defaultValue={application.signature}
                    />
          </Bucket>
          </Partition>
          {errors!=='' && <ErrorMessage>{errors}</ErrorMessage>}
          <CreateButton 
              onClick={() => approveApplication(application)}
              disabled={errors!==''}>
              Approve application #{application.application_id}
          </CreateButton>

      </Application>

        ) 
    }
};
