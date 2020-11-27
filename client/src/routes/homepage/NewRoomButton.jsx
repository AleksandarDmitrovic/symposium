import { useState } from 'react';
import NewRoomForm from './NewRoomForm';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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
     border: '2px solid #000',
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
       <Button color="primary"
          className="new-room-button"
          onClick={handleOpen}
       >
          Create A Conversation Room
          {props.children}
       </Button>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
       >
         {body}
       </Modal>
    </>
  );
}
