import { useState } from 'react';
import { v1 as uuid } from "uuid";
import axios from 'axios';
import PodcastSearch from '../conversation_container/search/PodcastSearch';

export default function NewRoomForm (props) {
  const [title, setTitle] = useState(props.title ||'');
  const [description, setDescription] = useState(props.description || '');
  const [podcastInfo, setPodcastInfo] = useState(props.podcastInfo || '');
  const [episodeInfo, setEpisodeInfo] = useState([{}]);
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
    showDropdown();
  };

  const showDropdown = () => {
    if (document.getElementsByClassName('result-container')[1]) {
      if (document.getElementsByClassName('result-container')[1].style.visibility === 'hidden') {
        document.getElementById('episode-list').style.visibility = 'visible';
      } 
    }
  }

  function create(event) {
    event.preventDefault();
    const id = uuid();
    let selectedEpisode = episodeInfo.filter(obj => obj.embed_title === val);

    if (validate()) {
      axios.put(`/api/conversations`, { 
        url: id, 
        title: title, 
        description: description, 
        podcastInfo: podcastInfo,
        embedTitle: selectedEpisode[0].embed_title,
        embedUrl: selectedEpisode[0].embed_url
      })
      .then((res) => {
        props.history.push(`/room/${id}`);
      })
      .catch(error => { console.error(error) }); 
    }
  }

  // Render the episodes for the dropdown based on selected podcast
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
            changeEpisodeInfo = {setEpisodeInfo}
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