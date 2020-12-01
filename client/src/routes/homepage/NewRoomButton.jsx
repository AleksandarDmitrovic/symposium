import { useState } from 'react';

import { Add } from '@material-ui/icons'
import {  Dialog, DialogContent, DialogContentText } from '@material-ui/core';
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

  return (
     <>
      <button className={`bttn-jelly bttn-md bttn-primary ${props.className}`} onClick={handleOpen} data-cy="create">
        {props.text}
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
