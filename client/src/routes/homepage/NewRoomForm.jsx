import { useState } from 'react';
import { v1 as uuid } from "uuid";
import axios from 'axios';
import moment from 'moment'
import { Button, Menu, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import PodcastSearch from './search/PodcastSearch';
import TimePicker from './TimePicker';
import './form-styles/NewRoomForm.scss';


const useStyles = makeStyles((theme) => ({
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
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
    } else if ((timeAvailable - moment().unix()) <= 0) {
      setError("Please set a time for later today");
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
    
    const time = futureTime.unix();

    setTimeAvailable(time);
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
        timeAvailable: timeAvailable, 
        podcastInfo: podcastInfo,
        embedTitle: selectedEpisode[0].embed_title,
        embedUrl: selectedEpisode[0].embed_url
      })
      .then((res) => {       
        props.connection.emit("new conversation created", res)
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
    if (Array.isArray(titles)) {
      return titles.map(title => {
        return (
          <MenuItem key={title.embed_title} onClick={() => { handleClose(title.embed_title)}} data-cy="episodes">{title.embed_title} </MenuItem>
        );
      });
    }
    return;
  }
  
  const classes = useStyles();
 
  return (
    <main>
        <form className="new_room_form" autoComplete="off" onSubmit={create}>
          <h3 id="form-title">Create A Podcast Conversation</h3>
          <br/>
          <TextField
            title="title"
            type="text"
            label="Conversation Title"
            onChange={changeTitle}
            value={title}
            className={classes.inputField}
            data-cy="title"
          />
          <br/>
          <TextField
            description="description"
            type="text"
            label="Conversation Description"
            onChange={changeDescription}
            value={description}
            className={classes.inputField}
            data-cy="description"
          />
          <br/>
          <TimePicker
            changeTimeAvailable={changeTimeAvailable}
          />
          <br/>
          <div className ="podcast-selectors">
            <PodcastSearch 
              changePodcastInfo = {changePodcastInfo}
              changeEpisodeInfo = {setEpisodeInfo}
              label={"SELECT PODCAST"}
              form={true}
              resultWidth='380px'
            />
            <br/>
            <Button 
              id='episode-list' 
              variant="outlined" 
              fullWidth={true} 
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={handleClick}
              data-cy="episode-select"
            >
                Select Episode
            </Button>
            <p id='display-episode'>{val}</p>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              data-cy="episode-list"
            >
              {listTitles(episodeInfo)}
            </Menu>
          </div>
          <br/>
          <section className="form__validation" data-cy="form-validation">{error}</section>
          <button className='bttn-jelly bttn-md bttn-primary submit-btn' style={{width: '500px'}} type='submit' value='submit' data-cy="submit">
            Submit
          </button>
        </form>
    </main>
  );
};