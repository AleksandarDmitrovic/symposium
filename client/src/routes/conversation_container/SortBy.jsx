import PodcastSearch from './search/PodcastSearch';

// Passes information to ConversationList

export default function SortBy (props) {

  // Set State
  // Default to sort by all

  return (
    <div>
      <p>Sort By : All | Category | Search </p>
      <PodcastSearch />
    </div>
  )
}