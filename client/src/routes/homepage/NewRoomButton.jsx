import { useState } from 'react';
import { Button } from '@material-ui/core';

import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import './conversation-styles/index.scss';



import NewRoomForm from './NewRoomForm';
import './conversation-styles/index.scss';
 
export default function NewRoomButton(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };  
  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create Your Podcast Conversation</h2>
      <NewRoomForm 
         history = {props.history}
         connection={props.connection}
      />
    </div>
  );

  return (
     <>
      <button className={`bttn-gradient bttn-md bttn-royal ${props.class}`} onClick={handleOpen}>
        Create A New Conversation Room
        <Add style={{marginLeft: '0.5em'}}/>
        {props.children}
      </button>
 
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
      </Dialog>
    </>
  );
}
