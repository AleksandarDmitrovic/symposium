export default function Episodes(props) {

  // Set episode state in the NewRoomForm Component
  props.changeEpisodes(props.episodes);

  const listTitles = titles => {
    return titles.map(title => {
      return (
        <option id={title.title}>{title.title}</option>
      );
    });
  }
  
  return listTitles(props.episodes);
}