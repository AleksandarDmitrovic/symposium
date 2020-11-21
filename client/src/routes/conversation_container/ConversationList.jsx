import IndividualConversation from "./IndividualConversation"

const mapConversations = function (props) {
  const conversations = props.SOMETHING(conversation => {
    return (
      <IndividualConversation
        //This is each individual conversation
      />
    );
  });
  return conversations;
};


export default function ConversationList(props) {
  return (
    <ul>
      <IndividualConversation/>  
      {/* mapConversations(props) */ }
    </ul>
  );
};

