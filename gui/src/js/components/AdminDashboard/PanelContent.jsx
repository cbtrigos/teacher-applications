import React from "react";
import { H2, H1, Application, CreateButton, Partition, Field, Bucket, InputLarge} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel, ExpansionPanelInsideSummary, ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import Tracker from '../ApplicantDashboard/Tracker.jsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Approver1Form from './DecisionForms/Approver1Form.jsx';
import Approver2Form from './DecisionForms/Approver2Form.jsx';
import Approver3Form from './DecisionForms/Approver3Form.jsx';
import RejectionForm from './DecisionForms/RejectionForm.jsx';

export function Actions(props) {
    const {user, application, approveApplication, rejectApplication} = props
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return (
          <div >
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                  <H2 >Applicant Submission #{application.application_id}</H2> 
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
              <Application>
                  <H1>Submitted Application by {application.first_name}</H1>
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
                  </Partition>
            
                <Partition>
                <H2>School Information</H2>
                <Bucket>
                <H2 left label>Name of School:</H2>
                    <Field
                    disabled={true}
                    value={application.school_name}/>   
                </Bucket>
                <Bucket>
                    <H2 left label>Employing Authority:</H2>
                    <Field 
                    disabled={true}
                    value={application.employing_authority}
                    />
                </Bucket>
                </Partition>

                      <Partition>
                      <Bucket>
                    <H2 label left>Other Names:</H2>
                        <InputLarge
                        disabled={true}
                        value={application.other_names}
                        />
                      </Bucket>
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
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelInsideSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <H2 >Approval Form</H2>
              </ExpansionPanelInsideSummary>
              <ExpansionPanelDetails>
                  {user.user_type===1
                  && <Approver1Form application={application} user={user} approveApplication={approveApplication}/>
                  }
                  {user.user_type===2 
                  && <Approver2Form application={application} user={user}  approveApplication={approveApplication}/>
                  }   
                  {user.user_type===3
                  && <Approver3Form application={application} user={user}  approveApplication={approveApplication}/>
                  } 
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
            <H2>#{application.application_id}: {application.application_type} School Application {application.school_name!==null && <>for {application.school_name}</>}{application.rejection_reason!==null && <> --- <span style={{color: 'darkred'}}>REJECTED</span></>} </H2>
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

