import IndividualConversation from "./IndividualConversation"

const mapConversations = function (props) {
  const conversations = props.conversations.map(conversation => {

    return (
      <IndividualConversation
        //HOW do we set unique keys properly for these elements
        // keyValue={conversation.id}
        title={conversation.title}
        podcast_name={conversation.podcast_name}
        description={conversation.description}
        image={conversation.podcast_image}
        url={conversation.conversation_url}
        history={props.history}
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

