import IndividualConversation from "./IndividualConversation"

const mapConversations = function (props) {

  const conversations = props.conversations.map(conversation => {

    return (
      <IndividualConversation
        key={conversation.url}
        id={conversation.id}
        category_id={conversation.category_id}
        title={conversation.title}
        podcast_name={conversation.podcast_name}
        episode_title = {conversation.podcast_episode_title}
        description={conversation.description}
        image={conversation.podcast_image}
        url={conversation.conversation_url}
        audio={conversation.podcast_episode_embed_url}
        history={props.history}
        is_active = {conversation.is_active}
        available_until = {conversation.available_until}
      />
    )
  });
  return conversations;
};

export default function ConversationList(props) {

  return (
    <ul className='convo-list' data-cy='convo-list'>
      { mapConversations(props) }
    </ul>
  );
};

