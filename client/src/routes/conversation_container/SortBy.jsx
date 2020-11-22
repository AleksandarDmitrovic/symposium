import './conversation-styles/sortby.scss'

import PodcastSearch from "./search/PodcastSearch";

export default function SortBy (props) {

  // CATEGORY BUTTON IS HARDCODED TO 1

  return (
    <ul className="sort-by">
      <li><button onClick={() => { props.state('conversations') } }>All</button></li>
      <li><button onClick={() => { props.state('conversations/category/1') } }>Category</button></li>
      <li><PodcastSearch state={props.state}/></li>
    </ul>
  )
}