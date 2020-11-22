import IndividualConversation from "./IndividualConversation"

const mapConversations = function (props) {
  const conversations = props.conversations.map(conversation => {
    return (
      <IndividualConversation
        key={conversation.id}
        title={conversation.title}
        podcast_name={conversation.podcast_name}
        description={conversation.description}
        image={conversation.podcast_image}
      />
    )
  });
  return conversations;
};

export default function ConversationList(props) {

  return (
    <ul>
      { mapConversations(props) }
    </ul>
  );
};

