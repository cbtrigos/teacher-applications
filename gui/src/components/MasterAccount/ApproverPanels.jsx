import React from "react";
import { H1, H2, Field, Notification, InputLarge, ErrorMessage, Label, Bucket, Partition, Application, Buttons, Left, CreateButton} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'


export default function ApproverPanels(props) {
    const {application,  approveOpening, rejectOpening, rejection_reason, serverMessage, updateReason} = props
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = panel => (event, BucketExpanded) => {
        setExpanded(BucketExpanded ? panel : false);
    };
    return ( 
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                <H2>{application.title_proposed_appt} needed at {application.school} </H2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                <Application>
                <Partition>
                    <H1>Contact Information</H1>
                <Bucket>
                    <H2 left label>Title</H2>
                    <Field 
                    disabled={true}
                    value={application.contact_title}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Full Name</H2>
                    <Field 
                    disabled={true}
                    value={application.contact_name}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Birth Date</H2>
                    <Field 
                    disabled={true}
                    value={application.contact_DOB.slice(0,10)}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Email</H2>
                    <Field 
                    disabled={true}
                    value={application.contact_email}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Mobile</H2>
                    <Field 
                    disabled={true}
                    value={application.contact_mobile}
                    />
                </Bucket> 
                </Partition>
                <Partition>
                <H1>School Information</H1>

                <Bucket>
                    <H2 left label>School Name</H2>
                    <Field 
                    disabled={true}
                    value={application.school}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>School Type</H2>
                    <Field 
                    disabled={true}
                    value={application.school_type}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>EMIS Code</H2>
                    <Field 
                    disabled={true}
                    value={application.emis_code}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Title of Proposed Appointment</H2>
                    <Field 
                    disabled={true}
                    value={application.title_proposed_appt}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Date of Proposed Appointment</H2>
                    <Field 
                    disabled={true}
                    value={application.date_proposed_appt.slice(0,10)}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Reasons for of Proposed Appointment</H2>
                    <Field 
                    disabled={true}
                    value={application.reasons_proposed_appt}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Grade Requested</H2>
                    <Field 
                    disabled={true}
                    value={application.grade_requested}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Qualifications Required</H2>
                    <Field 
                    disabled={true}
                    value={application.qualifications_required}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Total Pupil Enrollment</H2>
                    <Field 
                    disabled={true}
                    value={application.pupil_enrollment}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Total number of Teachers</H2>
                    <Field 
                    disabled={true}
                    value={application.number_of_teachers}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Number of Teachers on Payroll</H2>
                    <Field 
                    disabled={true}
                    value={application.on_payroll}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>School District</H2>
                    <Field 
                    disabled={true}
                    value={application.district}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Date Request was made:</H2>
                    <Field 
                    disabled={true}
                    value={application.opening_created.slice(0,10)}
                    />
                </Bucket>
                {application.school_type==='Vocational' && 
                <Bucket>
                    <H2 left label>Trained and Qualified (TQ) for Vocational Level</H2>
                    <Field 
                    disabled={true}
                    value={application.tq_vocational}
                    />
                </Bucket>}
                {application.school_type==='Secondary' && 
                <>
                <Bucket>
                    <H2 left label>Trained and Qualified (TQ) for JSS Level</H2>
                    <Field 
                    disabled={true}
                    value={application.tq_JSS}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Trained and Qualified (TQ) for SSS Level</H2>
                    <Field 
                    disabled={true}
                    value={application.tq_SSS}
                    />
                </Bucket>
                </>
                }
                {application.school_type==='Primary' && 
                <Bucket>
                    <H2 left label>Trained and Qualified (TQ) for Primary Level</H2>
                    <Field 
                    disabled={true}
                    value={application.tq_primary}
                    />
                </Bucket>}
                <Bucket>
                    <H2 left label>Additional Information</H2>
                    <InputLarge 
                    disabled={true}
                    value={application.opening_additional_info}
                    />
                </Bucket>

                </Partition>
                </Application>
                <br/> <br/>
                <Application>
                    <H1>Your Approval</H1>
                    {serverMessage!== '' && <Notification>{serverMessage}</Notification>}
                    <Label>Rejection Reason</Label>
                    <InputLarge
                    style= {{padding: '1em', width: '100%'}}
                    placeholder={'Only required for rejections'}
                    type='text'
                    onChange={updateReason()}
                    name='rejection_reason'
                    />
                      <br/>
                    {(rejection_reason.length>150 || rejection_reason.length<15) && <ErrorMessage>Reason must be between 15-150 characters</ErrorMessage>}
                    <br/>  
                    <Buttons>
                        <Left>
                            <CreateButton
                            onClick={approveOpening(application)}
                            >
                                Approve 
                            </CreateButton>
                        </Left>
                        <CreateButton
                            disabled={rejection_reason.length>150||rejection_reason.length<15 }
                            onClick={rejectOpening(application)}

                        >
                            Reject
                        </CreateButton>
                    </Buttons>
                </Application>
                </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
    
        );
    }
    