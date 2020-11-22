import { useState, forwardRef } from 'react';

import NewRoomForm from './NewRoomForm';
import { Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// function rand() {
//    return Math.round(Math.random() * 20) - 10;
//  }
 
//  function getModalStyle() {
//    const top = 50 + rand();
//    const left = 50 + rand();
 
//    return {
//      top: `${top}%`,
//      left: `${left}%`,
//      transform: `translate(-${top}%, -${left}%)`,
//    };
//  }
 
//  const useStyles = makeStyles((theme) => ({
//    paper: {
//      position: 'absolute',
//      width: 400,
//      backgroundColor: theme.palette.background.paper,
//      border: '2px solid #000',
//      boxShadow: theme.shadows[5],
//      padding: theme.spacing(2, 4, 3),
//    },
//  }));
 


export default function NewRoomButton(props) {
  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };  
  const handleClose = () => {
    setOpen(false);
  };

  return (
     <>
      {/* forwardRef((props, ref) => {
        <Button ref={ref} color="primary"
          className="new_room_button"
          onClick={handleOpen}
       >
          Create A Conversation Room
          {props.children}
       </Button>
      }); */}
       <Button color="primary"
          className="new_room_button"
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
         <NewRoomForm 
         history = {props.history}
         />
       </Modal>
       
     </>
  );
}
