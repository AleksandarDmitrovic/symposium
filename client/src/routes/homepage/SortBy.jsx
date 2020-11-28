import { useState } from 'react';
import { Menu, MenuItem, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import PodcastSearch from "./search/PodcastSearch";
import './conversation-styles/sortby.scss'

export default function SortBy (props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState(null);
  const [sorted, setSorted] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    setSorted(true);
    props.state(`conversations/category/${id}`)
    
    axios.get(`/api/categories/${id}`).then((res) => {
      setCategory(res.data.categoryName.name)
    });
  };

  // const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div id='sort-by-container'>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={() => { props.state('conversations'); setCategory(null); setSorted(true); } }
            label="All" 
          />
          <Tab 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            label="Category"
          /> 
          <Menu
            id="simple-menu"
            className="category-sort"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => { handleClose(1)}}>Other</MenuItem>
            <MenuItem onClick={() => { handleClose(2)}}>Technology</MenuItem>
            <MenuItem onClick={() => { handleClose(3)}}>Arts</MenuItem>
            <MenuItem onClick={() => { handleClose(4)}}>Business</MenuItem>
            <MenuItem onClick={() => { handleClose(5)}}>Comedy</MenuItem>
            <MenuItem onClick={() => { handleClose(6)}}>Education</MenuItem>
            <MenuItem onClick={() => { handleClose(7)}}>Science</MenuItem>
            <MenuItem onClick={() => { handleClose(8)}}>Sports</MenuItem>
            <MenuItem onClick={() => { handleClose(9)}}>True Crime</MenuItem>
            <MenuItem onClick={() => { handleClose(10)}}>History</MenuItem>
            <MenuItem onClick={() => { handleClose(11)}}>Health</MenuItem>
          </Menu>
        <PodcastSearch 
          state={props.state}
          sortedBy={setCategory}
          sorted={sorted}
          setSorted={setSorted}
        />
        </Tabs>
      </div>
      <div id="category-name"className={classes.root}>{category}</div>
    </>
  )
}