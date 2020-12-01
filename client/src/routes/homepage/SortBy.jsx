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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: "#191919",
        color: "white"
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      <div id='sort-by-container' data-cy='sort-by'>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{style: {background:'#3f51b5'}}}
        >
          <Tab
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={() => { props.state('conversations'); setCategory(null); setSorted(true); } }
            label="All" 
            data-cy='view-all'
          />
          <Tab 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            inkBarStyle={{background: 'blue'}}
            onClick={handleClick}
            label="Category"
            data-cy='view-category'
          /> 
          <Menu
            id="simple-menu"
            className={classes.menu}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            data-cy='category-options'
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
          label={'SEARCH PODCASTS'}
          fontColor='white'
          resultWidth='330px'
        />
        </Tabs>
      </div>
      <div id="category-name" className={classes.root} data-cy='category-name' >{category}</div>
    </>
  )
}