import { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment'

export default function ConvoTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(moment());

  const { changeTimeAvailable } = props;

  useEffect(()=> {
    changeTimeAvailable(selectedDate)
  }, [changeTimeAvailable, selectedDate]) 

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    
      <TimePicker
        ampm={true}
        openTo="hours"
        views={["hours", "minutes"]}
        format="HH:mm"
        label="THIS CONVERSATION WILL EXPIRE AT:"
        value={selectedDate}
        onChange={handleDateChange}
        data-cy="time-selector"
      />

    </MuiPickersUtilsProvider>
  );
}