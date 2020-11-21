import Conversation from "components/conversation"

const mapConversations = function (props) {
  const conversations = props.SOMETHING(conversation => {
    return (
      <Conversation
        //This is each individual conversation
      />
    );
  });
  return conversations;
};


export default function ConversationList(props) {
  return (
    <ul>
      {mapConversations(props)}
    </ul>
  );
};

