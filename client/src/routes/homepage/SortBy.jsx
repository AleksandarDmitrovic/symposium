import { useState } from 'react';
import { Button, Menu, MenuItem, Tabs, Tab } from '@material-ui/core';
import PodcastSearch from "./search/PodcastSearch";
import './conversation-styles/sortby.scss'

export default function SortBy (props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    setAnchorEl(null);
    props.state(`conversations/category/${id}`)
  };

  // const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // CATEGORY BUTTON IS HARDCODED TO 1 ("OTHER")

  return (

    <div className='sort-by-container'>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          aria-controls="simple-menu" 
          aria-haspopup="true" 
          onClick={() => { props.state('conversations') } }
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
      </Tabs>
      <PodcastSearch state={props.state}/>
    </div>
   
    // <ul className="sort-by">
    //   <li>
    //     <h5>Sort By</h5>
    //   </li>
    //   <li>
    //     <Tab
    //     aria-controls="simple-menu" 
    //     aria-haspopup="true" 
    //     onClick={() => { props.state('conversations') } }
    //     label="All" 
    //     >
    //     </Tab>
    //   </li>
    //   <li>
    //     <div>
    //       <Tab 
    //       aria-controls="simple-menu" 
    //       aria-haspopup="true" 
    //       onClick={handleClick}
    //       label="Category"
    //       >
            
    //       </Tab>
    //       <Menu
    //         id="simple-menu"
    //         anchorEl={anchorEl}
    //         keepMounted
    //         open={Boolean(anchorEl)}
    //         onClose={() => setAnchorEl(null)}
    //       >
    //         <MenuItem onClick={() => { handleClose(1)}}>Other</MenuItem>
    //         <MenuItem onClick={() => { handleClose(2)}}>Technology</MenuItem>
    //         <MenuItem onClick={() => { handleClose(3)}}>Arts</MenuItem>
    //         <MenuItem onClick={() => { handleClose(4)}}>Business</MenuItem>
    //         <MenuItem onClick={() => { handleClose(5)}}>Comedy</MenuItem>
    //         <MenuItem onClick={() => { handleClose(6)}}>Education</MenuItem>
    //         <MenuItem onClick={() => { handleClose(7)}}>Science</MenuItem>
    //         <MenuItem onClick={() => { handleClose(8)}}>Sports</MenuItem>
    //         <MenuItem onClick={() => { handleClose(9)}}>True Crime</MenuItem>
    //         <MenuItem onClick={() => { handleClose(10)}}>History</MenuItem>
    //         <MenuItem onClick={() => { handleClose(11)}}>Health</MenuItem>
    //       </Menu>
    //     </div>
    //   </li>
    //   <li><PodcastSearch state={props.state}/></li>
    // </ul>
  )
}