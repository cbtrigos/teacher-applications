import React from "react";
import {H2, CreateButton, Buttons, Left} from '../../constants/utils/Styling.jsx'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '../../constants/utils/ExpandingPanels.jsx'


export default function DraftPanels(props) {
const {application, type, updateChosen, deleteApplication} = props
const [expanded, setExpanded] = React.useState('panel1');
const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
};


return ( <div>
                <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
        <H2>{application.application_type} School Application {application.school_name!==null && <>for {application.school_name}</>}</H2>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <H2>
                    {/* <H2  style={{textAlign: 'left', margin:'0 30% 0 30%'}}> */}
                        Application ID: {application.application_id} <br/>  
                        Created: {application.created.slice(0,10)} <br/>
                        Other names: {application.other_names} <br/>
                        Nationality: {application.nationality} <br/>


                        {type==='draft' 
                            ? <>Last Edited: {application.last_edited.slice(0,10)}<br/><br/>
                                <Buttons>
                                    <Left>
                                      <CreateButton onClick={() => updateChosen(application)}>Continue application</CreateButton>
                                    </Left>
                                      <CreateButton onClick={() => deleteApplication(application.application_id)}>Delete this application</CreateButton>
                                </Buttons>
                            </>
                            : <>Submitted: {application.last_edited.slice(0,10)}<br/><br/>
                                <Buttons>
                                    <Left>
                                      <CreateButton>Track application</CreateButton>
                                    </Left>
                                      <CreateButton onClick={() => deleteApplication(application.application_id)}>Delete this application</CreateButton>
                                </Buttons>
                            </>}

                    </H2>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>

    );
}

