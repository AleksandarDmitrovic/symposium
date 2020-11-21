import NewRoomForm from './NewRoomForm';

export default function Button(props) {

   const renderForm = () => {
      //Set NewRoomForm from invisible to visible
    }

   return (
      <>
        <button
           className="new_room_button"
           onClick={renderForm}
        >
           Create A Conversation Room
           {props.children}
        </button>
        <NewRoomForm/>
      </>
   );
}
