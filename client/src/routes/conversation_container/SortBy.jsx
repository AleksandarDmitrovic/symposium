import './conversation-styles/sortby.scss'

export default function SortBy (props) {

  console.log('props in sortBy', props);

  props.state('Category')

  return (
    <ul class="sort-by">
      <li><button>All</button></li>
      <li><button>Category</button></li>
      <li><button>Search</button></li>
    </ul>
  )
}