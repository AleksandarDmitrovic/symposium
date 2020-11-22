import { useState } from 'react';
import { v1 as uuid } from "uuid";
import axios from 'axios';

export default function NewRoomForm (props) {
  // console.log("history", props.props.history)
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [podcastName, setPodcastName] = useState(props.podcastName || "");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changePodcastName = (event) => {
    setPodcastName(event.target.value);
  };

  function create() {
    const id = uuid();

    axios.put(`/api/conversations`, { url: id, title: title, description: description, podcastName: podcastName })
    .then((res) => {
      // console.log('res', res);
    })
    .catch(error => { console.error(error) });
    
    props.history.push(`/room/${id}`);

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
            required
          />
          <br/>
          <input
            description="description"
            type="text"
            placeholder="Enter Conversation Description"
            onChange={changeDescription}
            value={description}
            required
          />
           <br/>
          <label> Podcast </label>
          <select onChange={changePodcastName} value = {podcastName}>
            <option value="Sample Pod">Sample Pod</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
          <br/>
          <input type="submit" value="Submit" onClick={create}/>
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        </section>
      </section>
    </main>
  );
};
