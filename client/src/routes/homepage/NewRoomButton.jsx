import { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NewRoomForm from './NewRoomForm';
import './conversation-styles/index.scss';

 function getModalStyle() {
   const top = 50;
   const left = 50;
 
   return {
     top: `${top}%`,
     left: `${left}%`,
     transform: `translate(-${top}%, -${left}%)`,
   };
 }
 
 const useStyles = makeStyles((theme) => ({
   paper: {
     position: 'absolute',
     width: 600,
     maxHeight: '50em',
     backgroundColor: theme.palette.background.paper,
     
     boxShadow: theme.shadows[5],
     padding: theme.spacing(2, 4, 3),
   },
 }));
 
export default function NewRoomButton(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };  
  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    // <div style={modalStyle} className={classes.paper}>
    //   <h2 id="simple-modal-title">Create Your Podcast Conversation</h2>
      
      <NewRoomForm 
         history = {props.history}
         connection={props.connection}
      />
    // </div>
  );
 
  return (
     <>
       <Button color="primary"
          variant="contained"
          className="new-room-button"
          onClick={handleOpen}
          >
          Create A Conversation Room
          <br/>
     
          {/* <AddCircleOutlineIcon fontSize="large"/> */}
     
       </Button>
       {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
       >
         {body}
       </Modal> */}
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       >
       
        <DialogContent
        onClose={handleClose}
        >
          <DialogContentText id="alert-dialog-description">
          <NewRoomForm 
          history = {props.history}
          connection={props.connection}
          />
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
