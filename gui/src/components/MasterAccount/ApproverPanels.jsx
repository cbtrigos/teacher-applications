import React from "react";
import { H1, H2, Field, Bucket, Partition, Application} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel,  ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import axios from 'axios';


export default function ApproverPanels(props) {
    const {application, type, approveApplication, rejectApplication, user} = props
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = panel => (event, BucketExpanded) => {
        setExpanded(BucketExpanded ? panel : false);
    };
    return ( 
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                <H2>User ID #{user.user_id}: {application.first_name} {application.last_name}'s Request for __ </H2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Application>
                <Partition>
                    <H1>Personal Information</H1>
                <Bucket>
                    <H2 left label>First Name:</H2>
                    <Field 
                    disabled={true}
                    value={application.first_name}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Last Name:</H2>
                    <Field 
                    disabled={true}
                    value={application.last_name}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Gender:</H2>
                    <Field 
                    disabled={true}
                    value={application.gender}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Birth Date:</H2>
                    <Field 
                    disabled={true}
                    value={application.birth_date.slice(0,10)}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Email:</H2>
                    <Field 
                    disabled={true}
                    value={application.email}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Mobile:</H2>
                    <Field 
                    disabled={true}
                    value={application.mobile_number}
                    />
                </Bucket> 
                </Partition>
                <Partition>
                <H1>Administrative Information</H1>
                <Bucket>
                    <H2 left label>Title:</H2>
                    <Field 
                    disabled={true}
                    value={application.title}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>School Name:</H2>
                    <Field 
                    disabled={true}
                    value={application.school_name}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>EMIS Code:</H2>
                    <Field 
                    disabled={true}
                    value={application.emis_code}
                    />
                </Bucket>
                <Bucket>
                    <H2 left label>Date Request was made:</H2>
                    <Field 
                    disabled={true}
                    value={application.req_created.slice(0,10)}
                    />
                </Bucket>

                </Partition>
                </Application>
                </ExpansionPanelDetails>
            </ExpansionPanel>
    
        );
    }
    