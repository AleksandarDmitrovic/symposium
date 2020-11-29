import { useState } from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


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
      <Button 
        color="primary"
        variant="contained"
        className="new-room-button"
        onClick={handleOpen}
      >
        Create A Conversation Room
      </Button>
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
