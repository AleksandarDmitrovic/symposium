import { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

import './conversation-styles/sortby.scss'

import PodcastSearch from "./search/PodcastSearch";

export default function SortBy (props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    props.state(`conversations/category/${id}`)
  };

  // CATEGORY BUTTON IS HARDCODED TO 1

  return (
    <ul className="sort-by">
      <li>
        <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={() => { props.state('conversations') } }>
          All 
        </Button>
      </li>
      <li>
        <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Category
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
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
        </div>
      </li>
      <li><PodcastSearch state={props.state}/></li>
    </ul>
  )
}