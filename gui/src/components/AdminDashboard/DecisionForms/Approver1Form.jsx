import React, { Component } from "react";
import axios from 'axios';
import {A, H2, Application, Bucket, Field, Partition, Input, Left, Buttons, New, CreateButton, HorizSeparator} from '../../../constants/utils/Styling.jsx'


export default class Approver1Form extends Component {
  constructor(props) {
    super(props);
    const {user, application, monthly_salary, yearly_salary} = this.props
    this.state = {
      // submitOkay:false, 
      // errors: 'All fields are required.',
      checkmark: false, 
      approver_id: user.user_id, 
      user_id: application.user_id,
      application_id: application.application_id, 
      basic_monthly_salary: monthly_salary,
      basic_yearly_salary: yearly_salary,
      approver_1_name: user.first_name + ' ' + user.last_name,  
      approver_1_email: user.email
};

 }

handleChange = input => e => {
  const value = e.target.value
  this.setState({
        [input]: value    
    });

}

 handleCheckboxChange = name => event => {
  this.setState({ checkmark: event.target.checked })
}


  render() {
    const {approveApplication, monthly_salary, yearly_salary} = this.props;
    const {application} = this.state
        return (
          <Application>
            <H2>Based on the applicant's qualifications and the TSC's salary scale:</H2>
            <HorizSeparator/> 
            <Partition noBorder>
            <Bucket>
                <H2 label left htmlFor="basic_yearly_salary">Basic Annual Salary</H2>
                <Field
                    type = "text"
                    name="basic_yearly_salary"
                    noValidate
                    onChange= {this.handleChange('basic_yearly_salary')}
                    defaultValue={'LE ' + yearly_salary}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="basic_monthly_salary">Basic Monthly Salary</H2>
                <Field
                    type = "text"
                    name="basic_monthly_salary"
                    noValidate
                    onChange= {this.handleChange('basic_monthly_salary')}
                    defaultValue={'LE ' + monthly_salary}
                    />
          </Bucket>
            <br/><br/>

            <Buttons >
                <Left style={{minWidth: '2%', width: '4%'}}>
                    <Input 
                    type="checkbox"
                    checked={this.state.checkmark}
                    id='checked'
                    onChange={this.handleCheckboxChange()}
                    />
                </Left>
                <New>
                  I verify that the certificates are authentic and the application should move forward for approval.
                </New>
          </Buttons>
          </Partition>

            <CreateButton 
              onClick={() => approveApplication(this.state)}
              disabled={!this.state.checkmark}>
              Approve for Continuation #{this.state.application_id}
          </CreateButton>
          </Application>
      //     <Application>
      //     <Partition>
      //     <H1>Approval Petition for #{application.application_id} </H1>
      //     <Bucket>
      //           <H2 label left htmlFor="school_id">School ID (SID) *</H2>
      //           <Field
      //               type = "number"
      //               name="school_id"
      //               noValidate
      //               onChange={handleChangeSave('school_id')}
      //               defaultValue={application.school_id}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="title_proposed_appt">Title of Proposed Appointment *</H2>
      //           <Field
      //               type = "text"
      //               name="title_proposed_appt"
      //               noValidate
      //               onChange={handleChangeSave('title_proposed_appt')}
      //               defaultValue={application.title_proposed_appt}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="date_proposed_appt">Date of Proposed Appointment *</H2>
      //           <Field
      //               type = "date"
      //               name="date_proposed_appt"
      //               noValidate
      //               onChange={handleChangeSave('date_proposed_appt')}
      //               defaultValue={application.date_proposed_appt}
      //               />
      //           {formErrors.date_proposed_appt!=='' && <ErrorMessage>{formErrors.date_proposed_appt}</ErrorMessage>}
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="reasons_proposed_appt">Reasons for Proposed Appointment *</H2>
      //           <Field
      //               type = "text"
      //               name="reasons_proposed_appt"
      //               noValidate
      //               onChange={handleChangeSave('reasons_proposed_appt')}
      //               defaultValue={application.reasons_proposed_appt}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="current_pupil_enrollment">Current Pupil Enrollment *</H2>
      //           <Field
      //               type = "number"
      //               name="current_pupil_enrollment"
      //               noValidate
      //               onChange={handleChangeSave('current_pupil_enrollment')}
      //               defaultValue={application.current_pupil_enrollment}
      //               />
      //     </Bucket>
         
      //     <Bucket>
      //           <H2 label left htmlFor="on_payroll">Number of Teachers on Payroll *</H2>
      //           <Field
      //               type = "number"
      //               name="on_payroll"
      //               noValidate
      //               onChange={handleChangeSave('on_payroll')}
      //               defaultValue={application.on_payroll}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="JSS_level_qualified">Trained and Qualified (TQ) for JSS Level *</H2>
      //           <Field
      //               type = "number"
      //               name="JSS_level_qualified"
      //               noValidate
      //               onChange={handleChangeSave('JSS_level_qualified')}
      //               defaultValue={application.JSS_level_qualified}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="SSS_level_qualified">Trained and Qualified (TQ) for SSS Level *</H2>
      //           <Field
      //               type = "number"
      //               name="SSS_level_qualified"
      //               noValidate
      //               onChange={handleChangeSave('SSS_level_qualified')}
      //               defaultValue={application.SSS_level_qualified}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="mobile_number">Mobile Number *</H2>
      //           <Field 
      //               type = "text"
      //               name="mobile_number"
      //               noValidate
      //               disabled={true}
      //               defaultValue={application.mobile_number}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="approver_1_name">Approver Name *</H2>
      //           <Field 
      //               type = "text"
      //               name="approver_1_name"
      //               noValidate
      //               onChange={handleChangeSave('approver_1_name')}
      //               defaultValue={application.approver_1_name}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="date">Date*</H2>
      //           <Field
      //               name="date"
      //               noValidate
      //               disabled= {true}
      //               defaultValue={today}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="birth_date">Birth Date *</H2>
      //           <Field
      //               name="birth_date"
      //               noValidate
      //               disabled= {true}
      //               defaultValue={birth_date}
      //               />
      //     </Bucket>
      //     <Bucket>
      //           <H2 label left htmlFor="date">Signature *</H2>
      //           <Field
      //               name="signature"
      //               noValidate
      //               disabled= {true}
      //               defaultValue={application.signature}
      //               />
      //     </Bucket>
      //     </Partition>
      //     {errors!=='' && <ErrorMessage>{errors}</ErrorMessage>}
      //     <CreateButton 
      //         onClick={() => approveApplication(application)}
      //         disabled={errors!==''}>
      //         Approve application #{application.application_id}
      //     </CreateButton>

      // </Application>

        ) 
    }
};
