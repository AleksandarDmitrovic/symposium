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
  // const [episodeInfo, setEpisodeInfo] = useState([{}]);
  // const [selected, setSelected] = useState({});
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
  // const changeEpisodes = (episodes) => {
  //   setEpisodeInfo(episodes);
  // }

  // const selectEpisode = episode => {
  //   setSelected(episode);
  // }

  function create() {
    const id = uuid();
    if (validate()) {
      console.log('validation successful')
      axios.put(`/api/conversations`, { 
        url: id, 
        title: title, 
        description: description, 
        podcastInfo: podcastInfo,
        //! For Episode dropdown once up and running
        // episodeInfo: episodeInfo
      })
      .then((res) => {
        // console.log('res', res);
        props.history.push(`/room/${id}`);
      })
      .catch(error => { console.error(error) }); 
    }
  }
 
  return (
    <main>
      <section className="new_room_form">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
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
            // changeEpisodes = {changeEpisodes}
          />
           {/* <select id='episode-list'>
            <option>Episode:</option>
            <Episodes 
              episodes = {episodeInfo}
              selected = {selected}
              setSelected = {setSelected}
            />
          </select> */}
          <br/>
          <input type="submit" value="Submit" onClick={create}/>
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