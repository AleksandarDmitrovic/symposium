import { useState } from 'react';
import { v1 as uuid } from "uuid";
import axios from 'axios';
import moment from 'moment'
import PodcastSearch from '../conversation_container/search/PodcastSearch';
import TimePicker from './TimePicker';

import { Button, Menu, MenuItem, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

export default function NewRoomForm (props) {
  const [title, setTitle] = useState(props.title ||'');
  const [description, setDescription] = useState(props.description || '');
  const [timePicked, setTimePicked] = useState(props.timePicked || '');
  const [timeAvailable, setTimeAvailable] = useState(props.timeAvailable || 0);

  const [podcastInfo, setPodcastInfo] = useState(props.podcastInfo || '');
  const [episodeInfo, setEpisodeInfo] = useState([{}]);
  const [val, setVal] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (title === "") {
      setError("Conversation title cannot be blank");
      return;
    } else if (description === "") {
      setError("Conversation description cannot be blank");
      return;
    } else if (timeAvailable <= 0) {
      setError("Please set a time in the future");
      return;
    } else if (val === "") {
      setError("Podcast & Podcast Episode must be selected");
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

  const changeTimeAvailable = (value) => {
    setTimePicked(value);
    const hoursMins = timePicked.split(":");
   
    const futureTime = moment().set('hour', parseInt(hoursMins[0])).set('minute', parseInt(hoursMins[1]));
   
    const seconds = futureTime.unix() - moment().unix()

    setTimeAvailable(seconds);
    console.log('time :', timeAvailable);
   

  }

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
        document.getElementById('episode-list').style.visibility = 'hidden';
      })
      .catch(error => { console.error('Error: ', error) }); 
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    setVal(id);
    document.getElementById('display-episode').style.visibility = 'visible';
  };

  const listTitles = titles => {
    return titles.map(title => {
      return (
        <MenuItem key={title.embed_title} onClick={() => { handleClose(title.embed_title)}}>{title.embed_title}</MenuItem>
      );
    });
  }

  const classes = useStyles();
 
  return (
    <main>
      <section className="new_room_form">
        <form autoComplete="off" onSubmit={create}>
          <Input
            title="title"
            type="text"
            placeholder="Enter Conversation Title"
            onChange={changeTitle}
            value={title}
            className={classes.inputField}
          />
          <br/>
          <Input
            description="description"
            type="text"
            placeholder="Enter Conversation Description"
            onChange={changeDescription}
            value={description}
            className={classes.inputField}
          />
          <br/>
          <br/>
          <TimePicker
            changeTimeAvailable={changeTimeAvailable}
          />
          <br/>
          <PodcastSearch 
            changePodcastInfo = {changePodcastInfo}
            changeEpisodeInfo = {setEpisodeInfo}
          />
          <br/>
          <div>
            <Button id='episode-list' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Select Episode</Button>
            <br/>
            <p id='display-episode'>{val}</p>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {listTitles(episodeInfo)}
            </Menu>
          </div> 
          <br/>
          <Button type="submit" value="Submit">
            Submit
          </Button>
        </form>
        <section className="form__validation">{error}</section>
      </section>
    </main>
  );
};