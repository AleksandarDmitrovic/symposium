import { useState } from 'react';
import { v1 as uuid } from "uuid";
import axios from 'axios';
import PodcastSearch from '../conversation_container/search/PodcastSearch';
//! For Episode dropdown once up and running
// import Episodes from '../conversation_container/search/Episodes';

export default function NewRoomForm (props) {
  // console.log("history", props.props.history)
  const [title, setTitle] = useState(props.title ||'');
  const [description, setDescription] = useState(props.description || '');
  const [podcastInfo, setPodcastInfo] = useState(props.podcastInfo || '');
  //! For Episode dropdown once up and running
  const [episodeInfo, setEpisodeInfo] = useState([{}]);
  // const [selected, setSelected] = useState({});

  const [val, setVal] = useState('');

  const [error, setError] = useState("");

  const validate = () => {
    console.log('validating')
    if (title === undefined) {
      setError("Conversation title cannot be blank");
      return;
    } else if (description === undefined) {
      setError("Conversation description cannot be blank");
      return;
    } 
    setError("");
    return true;
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changePodcastInfo = (info) => {
    setPodcastInfo(info);
  };

  //! For Episode dropdown once up and running
  const changeEpisodeInfo = (episode) => {
    setEpisodeInfo(episode);
    console.log('setting new episode info in NewRoomForm =>', episodeInfo)
  }

  // const changeSelected = (episode) => {
  //   setSelected(episode);
  //   console.log('setting new selected', selected)
  // }

  function create(event) {
    event.preventDefault();
    const id = uuid();

    let theEp = episodeInfo.filter(obj=>obj.embed_title === val);

    if (validate()) {
      console.log('validation successful')
      console.log('this is the episode info inside create() =>', episodeInfo)
      axios.put(`/api/conversations`, { 
        url: id, 
        title: title, 
        description: description, 
        podcastInfo: podcastInfo,
        //! For Episode dropdown once up and running
        embedTitle: theEp[0].embed_title,
        embedUrl: theEp[0].embed_url
      })
      .then((res) => {
        // console.log('res', res);
        props.history.push(`/room/${id}`);
      })
      .catch(error => { console.error(error) }); 
    }
  }

  const listTitles = titles => {
    return titles.map(title => {
      return (
        <option key={title.embed_title} value={title.embed_title}>{title.embed_title}</option>
      );
    });
  }

  const handleChange = (event) => {
    setVal(event.target.value);
  }
 
  return (
    <main>
      <section className="new_room_form">
        <form autoComplete="off" onSubmit={create}>
          <input
            title="title"
            type="text"
            placeholder="Enter Conversation Title"
            onChange={changeTitle}
            value={title}
          />
          <br/>
          <input
            description="description"
            type="text"
            placeholder="Enter Conversation Description"
            onChange={changeDescription}
            value={description}
          />
           <br/>
          <label> Podcast </label>
          <PodcastSearch 
            changePodcastInfo = {changePodcastInfo}
            //! For Episode dropdown once up and running
            changeEpisodeInfo = {changeEpisodeInfo}
          />

          <select id='episode-list' value={val} onChange={handleChange}>
            <option value='none'>Episode:</option>
            {listTitles(episodeInfo)}
          </select>

          <br/>
          <input type="submit" value="Submit" />
        </form>
        <section className="form__validation">{error}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        </section>
      </section>
    </main>
  );
};