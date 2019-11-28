import React, { Component } from "react";
import {H2, H1, Application, ErrorMessage, CreateButton, Partition, Field, Bucket, InputLarge, Input,  Left} from '../../../constants/utils/Styling.jsx'


// need a today date 

export default class Approver2Form extends Component {
  constructor(props) {
    super(props);
    const user = props.user
    this.state = {
      submitOkay:false, 
      approval: {
        approver_id: user.user_id, 
        application_id: props.application.application_id, 
        teacher_salary: '',
        grade: '', 
        approver_2_name: '', 
        applicant_id: props.application.user_id
      }, 
      
};
 }


 handleChangeSave = input => e => {
  const value = e.target.value
  this.setState(prevState => ({
    approval: {                 
        ...prevState.approval, 
        [input]: value    
    }
  }))
  }


  render() {
    const { application, user, approveApplication } = this.props;
    const { approval } = this.state
    const appdate = application.approver_1_decision
    const propAppt = application.date_proposed_appt
    const birth = user.birth_date
    const approver_1_decision = appdate.slice(8,10) +'/'+ appdate.slice(5,7) + '/' + appdate.slice(0,4)
    const birth_date = birth.slice(8,10)+'/' +birth.slice(5,7) +'/' + birth.slice(0,4)
    const proposed_appt_date = propAppt.slice(8,10) +'/'+ propAppt.slice(5,7) + '/' + propAppt.slice(0,4)
    const t = new Date()
    const today = t.getDate() + '/' +t.getMonth() +'/' +t.getFullYear()
        return (
          <Application>
          <Partition>
          <H1>Previously Approved Petition for #{application.application_id} </H1>
          <Bucket>
                <H2 label left htmlFor="school_id">School ID (SID) *</H2>
                <Field
                    type = "number"
                    name="school_id"
                    noValidate
                    disabled={true}
                    defaultValue={application.school_id}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="title_proposed_appt">Title of Proposed Appointment *</H2>
                <Field
                    type = "text"
                    name="title_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={application.title_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date_proposed_appt">Date of Proposed Appointment *</H2>
                <Field
                    name="date_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={proposed_appt_date}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="reasons_proposed_appt">Reasons for Proposed Appointment *</H2>
                <Field
                    type = "text"
                    name="reasons_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={application.reasons_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="current_pupil_enrollment">Current Pupil Enrollment *</H2>
                <Field
                    type = "number"
                    name="current_pupil_enrollment"
                    noValidate
                    disabled={true}
                    defaultValue={application.current_pupil_enrollment}
                    />
          </Bucket>
         
          <Bucket>
                <H2 label left htmlFor="on_payroll">Number of Teachers on Payroll *</H2>
                <Field
                    type = "number"
                    name="on_payroll"
                    noValidate
                    disabled={true}
                    defaultValue={application.on_payroll}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="JSS_level_qualified">Trained and Qualified (TQ) for JSS Level *</H2>
                <Field
                    type = "number"
                    name="JSS_level_qualified"
                    noValidate
                    disabled={true}
                    defaultValue={application.JSS_level_qualified}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="SSS_level_qualified">Trained and Qualified (TQ) for SSS Level *</H2>
                <Field
                    type = "number"
                    name="SSS_level_qualified"
                    noValidate
                    disabled={true}
                    defaultValue={application.SSS_level_qualified}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="mobile_number">Approver Mobile Number *</H2>
                <Field 
                    type = "text"
                    name="mobile_number"
                    noValidate
                    disabled={true}
                    defaultValue={application.mobile_1_number}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="approver_1_name">Approver Name *</H2>
                <Field 
                    type = "text"
                    name="approver_1_name"
                    disabled={true}
                    noValidate
                    defaultValue={application.approver_1_name}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date">Date*</H2>
                <Field
                    name="date"
                    noValidate
                    disabled= {true}
                    defaultValue={approver_1_decision}
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
          <Partition>
          <H1>Your Approval Submission for #{application.application_id} </H1>
          <H2>Representing the TSC Teacher Management Department</H2>
          <Bucket>
                <H2 label left htmlFor="teacher_salary">Teacher's Basic Salary *</H2>
                <Field
                    type = "text"
                    pattern="-?[0-9]+[\,.]*[0-9]+"
                    name="teacher_salary"
                    noValidate
                    onChange={this.handleChangeSave('teacher_salary')}
                    defaultValue={approval.teacher_salary}
                    />
          </Bucket>
          <Bucket> 
            <H2 label left htmlFor="teacher_salary">Grade *</H2>
                {application.application_type==='Vocational'
                ?
                <Field
                    type = "text"
                    name="grade"
                    noValidate
                    onChange={this.handleChangeSave('grade')}
                    defaultValue={approval.grade}
                    />
                : 
                <Field
                    type = "number"
                    name="grade"
                    noValidate
                    onChange={this.handleChangeSave('grade')}
                    defaultValue={approval.grade}
                    />
                }
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="approver_2_name">Approver Name *</H2>
                <Field 
                    type = "text"
                    name="approver_2_name"
                    onChange={this.handleChangeSave('approver_2_name')}
                    noValidate
                    defaultValue={approval.approver_2_name}
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
          </Partition>
          {approval.approver_2_name==='' || approval.grade==='' || approval.teacher_salary==='' && <ErrorMessage>All fields are required.</ErrorMessage>}
          <CreateButton 
              onClick={() => approveApplication(approval)}
              disabled={approval.approver_2_name==='' || approval.grade==='' || approval.teacher_salary===''}>
              Approve application #{application.application_id}
          </CreateButton>

      </Application>

        ) 
    }
};
