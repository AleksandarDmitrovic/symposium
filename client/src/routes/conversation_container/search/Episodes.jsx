export default function Episodes(props) {

  const listTitles = titles => {
    return titles.map(title => {
      return (
        <option key={title.title} value={title.title}>{title.title}</option>
      );
    });
  }
  
  return listTitles(props.episodes);
}