import React from "react";
import {H2, CreateButton, Red, Buttons, Left} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'
import Tracker from './Tracker.jsx'

export default function DraftPanels(props) {
const {application, type, updateChosen, deleteApplication} = props
const [expanded, setExpanded] = React.useState('panel1');
const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
};


return ( <div>
                <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
 <H2 style={{textAlign:'center'}}>#{application.application_id}: {application.application_type} School Application {application.school_name!==null && <>for {application.school_name}</>} {application.rejection_reason!==null && <> --- <span style={{color: 'darkred'}}>REJECTED</span></>} </H2>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    {type==='draft' 
                        ?  <div style ={{width:'100%', display:'block'}}>
                            <H2>
                            Last Edited: {application.last_edited.slice(0,10)}<br/><br/>
                            Application ID: {application.application_id} <br/>  
                            Created: {application.created.slice(0,10)} <br/>
                            Other names: {application.other_names} <br/>
                            Nationality: {application.nationality} <br/>
                            </H2>
                            <Buttons>
                                <Left>
                                    <CreateButton onClick={() => updateChosen(application)}>Continue application</CreateButton>
                                </Left>
                                    <CreateButton onClick={() => deleteApplication(application.application_id)}>Delete this application</CreateButton>
                            </Buttons>
                        </div>
                        : 
                            <Tracker 
                                application= {application} 
                            />
                    }

                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>

    );
}

