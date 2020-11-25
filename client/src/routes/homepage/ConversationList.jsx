import IndividualConversation from "./IndividualConversation"

const mapConversations = function (props) {
  const conversations = props.conversations.map(conversation => {

    return (
      <IndividualConversation
        //HOW do we set unique keys properly for these elements
        // keyValue={conversation.id}
        title={conversation.title}
        podcast_name={conversation.podcast_name}
        episode_title = {conversation.podcast_episode_title}
        description={conversation.description}
        image={conversation.podcast_image}
        url={conversation.conversation_url}
        audio={conversation.podcast_episode_embed_url}
        starts_at={conversation.podcast_starts_at}
        ends_at={conversation.podcast_ends_at}
        history={props.history}
      />
    )
  });
  return conversations;
};

export default function ConversationList(props) {

  return (
    <ul id='convo-list'>
      { mapConversations(props) }
    </ul>
  );
};

