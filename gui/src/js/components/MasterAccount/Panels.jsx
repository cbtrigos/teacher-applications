import React from "react";
import { H2,} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel,  ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import Tracker from '../ApplicantDashboard/Tracker.jsx'

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
                        lksdjfdks
                </ExpansionPanelDetails>
            </ExpansionPanel>
    
        );
    }
    