import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, AccountCircle, ChevronLeft, Home, Update }  from '@material-ui/icons';
import NewRoomButton from "./NewRoomButton";
import './conversation-styles/index.scss';
import './conversation-styles/sideNav.scss';

const drawerWidth = '20vw';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'fixed',
    color: 'white'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#101010',
    color: 'white'
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    paddingLeft: '1em',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideNav(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (props.newConversations && !open) {
      document.getElementsByClassName('convo-list')[0].style.marginTop = '100px';
    } else {
      document.getElementsByClassName('convo-list')[0].style.marginTop = '0';
    }
  }, [props.newConversations, open])

  useEffect(() => {
    if (open) {
      document.getElementsByClassName('convo-list')[0].style.paddingLeft = '22vw';
      document.getElementsByClassName('convo-list')[0].style.paddingRight = '2vw';
      document.getElementsByClassName('convo-list')[0].style.marginTop = '0px';
      document.getElementsByClassName('fixed')[0].style.marginLeft = '23vw';
      document.getElementsByClassName('fixed')[0].style.top = '0';
      document.getElementsByClassName('top-btn')[0].className = ('top-btn new-room-button');
      document.getElementsByClassName('convo-btn')[0].style.height = '';
    } else {
      document.getElementsByClassName('convo-list')[0].style.paddingLeft = '12vw';
      document.getElementsByClassName('convo-list')[0].style.paddingRight = '12vw';
      document.getElementsByClassName('convo-list')[0].style.marginTop = '75px';
      document.getElementsByClassName('fixed')[0].style.marginLeft = '13vw';
      document.getElementsByClassName('fixed')[0].style.top = '10vh';
      document.getElementsByClassName('top-btn')[0].className = ('top-btn new-room-button-fixed');
      document.getElementsByClassName('convo-btn')[0].style.height = '6vh';
    }
  }, [open]);

  const symposium = 'sym·po·si·um \xa0\xa0\xa0 /simˈpōzēəm/';

  return (
    <div className={classes.root} data-cy='side-nav' style={{zIndex: 7}}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Menu />
        </IconButton>
        <Typography style={{fontFamily: "'Raleway', sans-serif"}} variant="h6" noWrap>
          Symposium
        </Typography>
      </Toolbar>
      <Drawer 
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      > 
        <div className={classes.drawerHeader} style={{backgroundColor: '#101010'}}>
          <h5 className='nav-title'>Symposium</h5>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft style={{color: 'white'}} />
          </IconButton>
        </div>
        <Divider />
        <List className='nav-list'>
          <ListItem button onClick={scrollToTop} data-cy='home'>
            <ListItemIcon style={{justifyContent: 'center', color: 'white'}}> <Home /> </ListItemIcon>
            <ListItemText primary='Home' style={{paddingLeft: '1em'}}/>
          </ListItem>
          {props.newConversations && 
            <ListItem button onClick={props.clearNotifications} 
              style={{
                borderBottom: '1px solid #1d89ff', 
                borderTop: '1px solid #1d89ff',
                paddingTop: '1em',
                paddingBottom: '1em'
              }}
            >
              <ListItemIcon style={{justifyContent: 'center', color: '#1d89ff'}}> <Update /> </ListItemIcon>
              <ListItemText primary='New Conversations Available' style={{paddingLeft: '1em'}}/>
            </ListItem>
          }
          <ListItem>
            <ListItemIcon style={{justifyContent: 'center', color: 'white'}}> <AccountCircle /> </ListItemIcon>
            <ListItemText primary='LH-Labber' style={{paddingLeft: '1em'}}/>
          </ListItem>
          <div className='nav-new-room-btn'>
            <NewRoomButton
              history={props.history}
              connection={props.connection}
              class='nav-btn'
              text='New Conversation Room'
            />
          </div>
        </List>
        <img className='logo' src='icon_c.png' alt='logo'/>
        <div className='symposium'>
          <p>{symposium}</p>
          <p>A meeting or conference for discussion of a particular subject</p>
        </div>
        <Divider />
        <div className='logout'>
          <button class="bttn-unite bttn-md bttn-primary">Log Out</button>
        </div>
      </Drawer>
    </div>
  );
}
