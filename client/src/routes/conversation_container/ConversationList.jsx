import IndividualConversation from "./IndividualConversation"

const mapConversations = function (conversationsArray) {

  const conversations = conversationsArray.map(conversation => {
    console.log('conversation', conversation);
    return (
      <div style={ {border: "1px solid black", margin: '1em' } } >
        <img src={conversation.podcast_image} alt="itunes" width="100" height="100"/>
      </div>
    )
  });
  return conversations;
};


export default function ConversationList(props) {

  return (
    <ul>
      { mapConversations(props.conversations) }
    </ul>
  );
};

