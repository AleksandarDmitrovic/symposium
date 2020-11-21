import { useState } from 'react';
import { Modal } from '@material-ui/core';

export default function NewRoomForm (props) {
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [podcastName, setPodcastName] = useState(props.podcastName || "");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

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
          <select>
            <option value="Sample Pod">Sample Pod</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        </section>
      </section>
    </main>
  );
};
