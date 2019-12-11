import React, { Component } from "react";
import {H2, H1, It, Div, Category, Application, Partition, CreateButton, Bucket, InputLarge, Field} from '../../constants/utils/Styling.jsx'
import {ExpansionPanelInsideSummary, ExpansionPanel, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PDFDownloadLink } from "@react-pdf/renderer";
import  PdfDocument  from "./ApplicationPDF.jsx";


export default function Tracker(props) {    
    const formatDate = date => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
      if (date!==null)
      { const minute = date.slice(14,16)
        const hour = date.slice(11,13)
        const d = date.slice(8,10)
        let day = 'xx'
        const month = monthNames[date.slice(5,7)-1]
        const year = date.slice(0,4)
        {d[1]==='1' 
          ? day=d+ 'st'
          : (d[1]==='2' 
            ? day = d+ 'nd'
            :(d[1]==='3'
              ? day = d+ 'rd'
              : day = d+ 'th'))
        }

        return day + ' of ' + month +', ' + year + ' at time: ' + hour + ':' + minute }
      else {
        return ''
      }
       
    }

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
      const application = props.application
      const subdate = formatDate(application.last_edited)
      const ddate_1 = formatDate(application.approver_1_decision)
      const ddate_2 = formatDate(application.approver_2_decision)

      return (
        <div style ={{width:'100%', display:'block'}}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelInsideSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <H2>Application</H2>
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
                          <Bucket>
                              <H2 label left>Job Opening ID:</H2>
                              <Field
                              disabled={true}
                              value={application.job_opening}/>
                          </Bucket>
                          <Bucket>
                              <H2 label left>School Name:</H2>
                              <Field
                              disabled={true}
                              value={application.school_name}/>
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
                  <br/> <br/>
                      <PDFDownloadLink
                          document={<PdfDocument application={application} />}
                          fileName={`${application.last_name}-${application.school}-Application.pdf`}
                          style={{
                            border: '2px solid white',
                            marginTop: '1em',
                            padding: '8px 8px',
                            color: 'black',
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontSize: '1em',
                            opacity: '.7',
                            width: '100%',
                            fontWeight: 'light',
                            display: 'block',
                            letterSpacing: '1px',
                            borderRadius: '8px',
                            background: '#FCBF49',
                            hover: '{ opacity: 1}'
                          }}
                        > Download a PDF Copy
                      </PDFDownloadLink>
              </Application>
 
        </ExpansionPanelDetails>
      </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelInsideSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <H2>Tracker </H2>
        </ExpansionPanelInsideSummary>
        <ExpansionPanelDetails>
        <div style ={{width:'100%', display:'block'}}>
            <H1>Application Status</H1>
            <H2>#{application.application_id}</H2>
            <Div>
                <Category>
                  Application submitted on: 
                </Category>
                <It>
                  {subdate}
                </It>
            </Div>
            <Div>
            <Category> Review by the TSC Teacher Management Department </Category>
              {application.approver_1===null 
                ? <It> Decision Pending</It>
                : application.approver_1==='false' 
                    ? <It>Rejected on the {ddate_1}<br/> Rejection reason: "{application.rejection_reason}"</It>
                    : application.approver_1==='true'
                      ? <It>Reviewed on {ddate_1}</It>
                      : <It> No updates to return </It>
              }
              </Div>
            {application.approver_1==='true' 
            &&
              <Div>
              <Category> Approval from the TSC Chair. </Category>
                {application.approver_2===null 
                  ? <It> Decision Pending</It>
                  : application.approver_2==='false' 
                      ? <It>Rejected on the {ddate_2}<br/> Rejection reason: "{application.rejection_reason}"</It>
                      : application.approver_2==='true'
                        ? <It>Approved on {ddate_2}</It>
                        : <It> No updates to return </It>
                }
                </Div>}
        </div>
   
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
   );
  };

