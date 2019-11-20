import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getThemeProps } from '@material-ui/styles';

export default class DonfirmDialogue extends React.Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            open: true,
        };
    }  

  handleClickOpen = () => {
    this.setState({
        open: true
    })
  };

  handleClose = () => {
    this.setState({
        open: false
    })
  };
 
  render () {
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this application? This cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes, delete. 
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  };
}