import React from "react";
import { H2, H1, Application, Partition, Field, Bucket, InputLarge} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel, ExpansionPanelInsideSummary, ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import Tracker from '../ApplicantDashboard/Tracker.jsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Approver1Form from './DecisionForms/Approver1Form.jsx';
import Approver2Form from './DecisionForms/Approver2Form.jsx';
import RejectionForm from './DecisionForms/RejectionForm.jsx';

function getSalary(grade, qualifications) {
    let monthly_salary = ''
    let yearly_salary = ''

    if (qualifications==='Teachers Certificate Lower (TCL)') {
        monthly_salary = '999,812.'
        yearly_salary =  '11,997,744.'
    }
    else if (qualifications==='Teachers Certificate (TC)') {
        monthly_salary = '1,061,522.'
        yearly_salary =  '12,738,264.'

    }
    else if (qualifications==="Higher Teachers Certificate (HTC) Primary or Secondary" || qualifications==="Bachelors of Science or Arts (B.Sc./B.A.) Hons or Gen") {
        monthly_salary = '1,210,164.'
        yearly_salary =  '14,521,968.'

    }
    else if (qualifications==="Bachelors of Education" ||qualifications === "Bachelors of Science or Arts in Education" || qualifications ==="Masters in Education or a Higher Degree") {
        if (grade==9) {
        monthly_salary = '1,675,846.'
        yearly_salary =  '20,110,152.'

        }
        else {
        monthly_salary = '1,356,648.'
        yearly_salary =  '16,279,776.'

    }
    }

    return [monthly_salary, yearly_salary]
}
export function Actions(props) {
    const {user, application, approveApplication, rejectApplication} = props
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [monthly_salary, yearly_salary] = getSalary(application.grade_requested, application.qualifications)
    return (
          <div >
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                    <H2>Job opening information at {application.school_name}</H2>
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
                  <Application>
                 <H1>Job Opening #{application.opening_key}</H1>
          <Partition>
          <Bucket>
                <H2 label left htmlFor="emis_code">EMIS code</H2>
                <Field
                    type = "number"
                    name="emis_code"
                    noValidate
                    disabled={true}
                    defaultValue={application.emis_code}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="school">School Name</H2>
                <Field
                    type = "text"
                    name="school"
                    noValidate
                    disabled={true}
                    defaultValue={application.school}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="district">School's District</H2>
                <Field
                    type = "text"
                    name="district"
                    noValidate
                    disabled={true}
                    defaultValue={application.district}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="title_proposed_appt">Title of Proposed Appointment</H2>
                <Field
                    type = "text"
                    name="title_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={application.title_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="date_proposed_appt">Date of Proposed Appointment</H2>
                <Field
                    type = "text"
                    name="date_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={application.date_proposed_appt.slice(0,10)}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="reasons_proposed_appt">Reasons for Proposed Appointment</H2>
                <Field
                    type = "text"
                    name="reasons_proposed_appt"
                    noValidate
                    disabled={true}
                    defaultValue={application.reasons_proposed_appt}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="pupil_enrollment">Current Pupil Enrollment</H2>
                <Field
                    type = "number"
                    name="pupil_enrollment"
                    noValidate
                    disabled={true}
                    defaultValue={application.pupil_enrollment}
                    />
          </Bucket>
         
          <Bucket>
                <H2 label left htmlFor="on_payroll">Number of Teachers on Payroll</H2>
                <Field
                    type = "number"
                    name="on_payroll"
                    noValidate
                    disabled={true}
                    defaultValue={application.on_payroll}
                    />
          </Bucket>
          {application.tq_JSS!==null &&  
            <Bucket>
                <H2 label left htmlFor="tq_JSS">Trained and Qualified (TQ) for JSS Level</H2>
                <Field
                    type = "number"
                    name="tq_JSS"
                    noValidate
                    disabled={true}
                    defaultValue={application.tq_JSS}
                    />
          </Bucket>}
            {application.tq_SSS!==null &&            
                <Bucket>
                <H2 label left htmlFor="tq_SSS">Trained and Qualified (TQ) for SSS Level</H2>
                <Field
                    type = "number"
                    name="tq_SSS"
                    noValidate
                    disabled={true}
                    defaultValue={application.tq_SSS}
                    />
          </Bucket>}
            {application.tq_vocational!==null &&  <Bucket>
                <H2 label left htmlFor="tq_vocational">Trained and Qualified (TQ) for Vocational Level</H2>
                <Field
                    type = "number"
                    name="tq_vocational"
                    noValidate
                    disabled={true}
                    defaultValue={application.tq_vocational}
                    />
          </Bucket>}
          <Bucket>
                <H2 label left htmlFor="required_qualifications">Required Qualifications </H2>
                <Field 
                    type = "text"
                    name="required_qualifications"
                    noValidate
                    disabled={true}
                    defaultValue={application.qualifications_required}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="contact_mobile">Contact's Mobile Number </H2>
                <Field 
                    type = "text"
                    name="contact_mobile"
                    noValidate
                    disabled={true}
                    defaultValue={application.contact_mobile}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="email">Contact's Email </H2>
                <Field 
                    type = "text"
                    name="email"
                    noValidate
                    disabled={true}
                    defaultValue={application.contact_email}
                    />
          </Bucket>
          <Bucket>
                <H2 label left htmlFor="application.contact_name">School Contact Name *</H2>
                <Field 
                    type = "text"
                    name="application.contact_name"
                    noValidate
                    disabled={true}
                    defaultValue={application.contact_title + ' ' +application.contact_name}
                    />
          </Bucket>
          </Partition>
          {/* {errors!=='' && <ErrorMessage>{errors}</ErrorMessage>} */}
          {/* <CreateButton 
              onClick={() => approveApplication(application)}
              disabled={errors!==''}>
              Approve application #{application.application_id}
          </CreateButton> */}

      </Application>         
              </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                  <H2 >Applicant Submission #{application.application_id}</H2> 
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
              <Application>
                  <H1>Applicant Submission by {application.first_name}</H1>
                  <H2>Submitted on: {application.last_edited.slice(0,10)}</H2>
                      <Partition>
                          <H2>Personal Information</H2>
                              <Bucket>
                                  <H2 label left>First Name:</H2>
                                  <Field 
                                  disabled={true}
                                  value={application.first_name}
                                  />
                              </Bucket>
                              <Bucket>
                              <H2 label  left>Last Name:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.last_name}/>
                              </Bucket>
                              <Bucket>
                                <H2 label left>Other Names:</H2>
                                    <InputLarge
                                    disabled={true}
                                    value={application.other_names}
                                    />
                                </Bucket>
                              <Bucket>
                              <H2 label  left>Email:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.email}/>
                              </Bucket>
                              <Bucket>
                              <H2 label  left>Mobile:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.mobile_number}/>
                              </Bucket>
                              <Bucket>
                              <H2 label  left>Date of Birth:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.birth_date.slice(0,10)}/>
                              </Bucket>
                              <Bucket>
                              <H2 label  left>Gender:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.sex}/>
                              </Bucket>
                              <Bucket>
                              <H2 label left>Nationality:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.nationality}/>
                              </Bucket>
                              <Bucket>
                              <H2 label left>National Identification Number:</H2>
                                  <Field
                                  disabled={true}
                                  value={application.national_id}/>
                              </Bucket>
              </Partition>
                      <Partition>
                      <H2 >Teacher Information</H2>
                          <Bucket>
                              <H2 left label>Pin Number:</H2>
                              <Field 
                              disabled={true}
                              value={application.pin_code}
                              />
                          </Bucket>
                          <Bucket>
                              <H2 label left>NASSIT Number:</H2>
                              <Field
                              disabled={true}
                              value={application.nassit}/>
                          </Bucket>
                  {/* </Partition>
            
                      <Partition> */}

                  <Bucket>
                  <H2 left label>Previous appointment and employing authority</H2>
                      <InputLarge
                      disabled={true}
                      value={application.prev_appt}/>
                  </Bucket>
                  <Bucket>
                      <H2 left label><br/>Qualifications</H2>
                      <InputLarge
                      disabled={true}
                      value={application.qualifications}/>
                  </Bucket>
                  <Bucket>
                      <H2 left label><br/>Special Skills</H2>
                      <InputLarge
                      disabled={true}
                      value={application.special_skills}/>
                  </Bucket>
                  </Partition>
              </Application>
              </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <H2 >Approval Form</H2>
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
                  {user.user_type===1
                  && <Approver1Form application={application} app = {application} user={user} approveApplication={approveApplication} monthly_salary={monthly_salary} yearly_salary={yearly_salary}/>
                  }
                  {user.user_type===2 
                  && <Approver2Form application={application} user={user}  approveApplication={approveApplication}/>
                  }   
                  {/* {user.user_type===3
                  && <Approver3Form application={application} user={user}  approveApplication={approveApplication}/>
                  }  */}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <H2>Rejection Form </H2>
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
                  <RejectionForm user={user} application={application} rejectApplication={rejectApplication}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
  }

export default function PanelContent(props) {
const {application, type, approveApplication, rejectApplication, user} = props
const [expanded, setExpanded] = React.useState('panel1');
const handleChange = panel => (event, BucketExpanded) => {
    setExpanded(BucketExpanded ? panel : false);
};
return ( 
    <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <H2>#{application.application_id}: {application.title_proposed_appt} {application.school_name!==null && <>for {application.school_name}</>}{application.rejection_reason!==null && <> --- <span style={{color: 'darkred'}}>REJECTED</span></>} </H2>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
                {type==='toApprove' 
                    ?
                      <Actions 
                        user = {user}
                        application={application} 
                        approveApplication ={approveApplication} 
                        rejectApplication={rejectApplication}/>
                    : <Tracker 
                         application= {application} />
                        }
            </ExpansionPanelDetails>
        </ExpansionPanel>

    );
}

