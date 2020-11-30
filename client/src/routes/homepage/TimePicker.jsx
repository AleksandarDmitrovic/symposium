import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

export default function TimePicker(props) {
  const [time, setTime] = useState("00:00");

  const { changeTimeAvailable } = props;

  const changeTime = (event) => {
    setTime(event.target.value)
  }

  useEffect(()=> {
    changeTimeAvailable(time)
  }, [changeTimeAvailable, time]) 
  
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="THIS CONVERSATION WILL EXPIRE AT:"
        type="time"
        defaultValue="00:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        value={time}
        onChange={changeTime}
        data-cy="time-selector"
      />
    </form>
  );
}