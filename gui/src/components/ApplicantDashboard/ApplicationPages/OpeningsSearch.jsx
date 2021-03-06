import React  from 'react';
import { H2, CreateButton, ErrorMessage, HorizSeparator} from '../../../constants/utils/Styling.jsx'
import { makeStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelAppSummary from '@material-ui/core/ExpansionPanelAppSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ExpansionPanel, ExpansionPanelAppSummary, ExpansionPanelDetails} from '../../../constants/utils/ExpandingPanels.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Opening(props) {
  const {opening, beginApp, serverMessage, bannedOpening} = props
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelAppSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}><H2 left> EMIS: {opening.emis_code}</H2></Typography>
              <Typography className={classes.secondaryHeading}><H2 left>{opening.school}</H2> </Typography>
            </ExpansionPanelAppSummary>
            <ExpansionPanelDetails>
              <div style={{width: '100%'}}>
              <HorizSeparator/>
              <H2 >Position Information: </H2><br/>
                <H2 >Looking for: <span style={{fontStyle:"italic"}}>{opening.title_proposed_appt} </span></H2>
                <H2 >To start on: <span style={{fontStyle:"italic"}}>{opening.date_proposed_appt.slice(0,10)} </span></H2>
                {!isNaN(opening.grade_requested) &&
                  <H2 >For grade level:  <span style={{fontStyle:"italic"}}>{opening.grade_requested} </span></H2>
                }
                {(bannedOpening===opening.opening_key && serverMessage!=='') && <ErrorMessage>{serverMessage}</ErrorMessage>}
                  <CreateButton 
                      onClick= {beginApp(opening)}>
                    Apply for this position
                  </CreateButton>            
                  </div>
                  </ExpansionPanelDetails>
          </ExpansionPanel>
       </div>
      );
}
