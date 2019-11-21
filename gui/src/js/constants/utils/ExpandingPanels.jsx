import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
        borderBottom: 0,
        },
        '&:before': {
        display: 'none',
        },
        '&$expanded': {
        margin: 'auto',
        },
    },
    expanded: {},
    })(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
    root: {
      // backgroundColor: 'rgba(0, 0, 0, .03)',
      backgroundColor: '#93A3B1',
      opacity: .8,
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&:hover': {
        opacity: 1,
      },
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);
  
export const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiExpansionPanelDetails);
  
  