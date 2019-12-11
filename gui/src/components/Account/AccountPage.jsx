import React  from 'react';
import { H2, Wrapper,} from '../../constants/utils/Styling.jsx'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditName from './EditName.jsx'
import EditEmail from './EditEmail.jsx'
import EditMobile from './EditMobile.jsx'
import ChangePassword from './ChangePassword.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '85%',
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

export default function MyAccount(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Wrapper>
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}><H2 left>Name</H2></Typography>
              <Typography className={classes.secondaryHeading}><H2 left>{props.user.first_name} {[props.user.last_name]}</H2> </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <H2 left>
                <EditName user={props.user}/>
              </H2>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}><H2 left>Email</H2></Typography>
              <Typography className={classes.secondaryHeading}>
                <H2 left>
                {/* {(props.user.email).slice(0,15).concat('..')} */}
                {props.user.email}
                </H2>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <H2 left>
              <EditEmail user={props.user}/>
              </H2>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography className={classes.heading}><H2 left>Phone Number</H2></Typography>
              <Typography className={classes.secondaryHeading}>
                <H2 left>
                {props.user.mobile_number}
                </H2>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <H2 left>
              <EditMobile user={props.user}/>
              </H2>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}><H2 left>Password</H2></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <H2 left>
                <ChangePassword user={props.user}/>
              </H2>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}><H2 left> General</H2></Typography>
              <Typography className={classes.secondaryHeading}>
              <H2 left>
              </H2>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails disabled={true}>
              <Typography>
              <H2 left>
              Account created on: {props.user.created.slice(0,10)} 

              </H2>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
  </Wrapper>
      );
}
