import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button  } from '@material-ui/core';
import { Menu, AccountCircle, ChevronLeft, Home }  from '@material-ui/icons';
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
    window.scrollTo(0,100);
  }

  useEffect(() => {
    if (props.newConversations) {
      document.getElementsByClassName('convo-list')[0].style.marginTop = '150px';
    } else {
      const margin = open ? '0px' : '75px';
      document.getElementsByClassName('convo-list')[0].style.marginTop = margin;
    }
  }, [props.newConversations, open])

  useEffect(() => {
    if (open) {
      document.getElementsByClassName('convo-list')[0].style.paddingLeft = '24vw';
      document.getElementsByClassName('convo-list')[0].style.paddingRight = '4vw';
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

  return (
    <div className={classes.root} style={{zIndex: 7}}>
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
          <ListItem button onClick={scrollToTop}>
            <ListItemIcon style={{justifyContent: 'center', color: 'white'}}> <Home /> </ListItemIcon>
            <ListItemText primary='Home' style={{paddingLeft: '1em'}}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon style={{justifyContent: 'center', color: 'white'}}> <AccountCircle /> </ListItemIcon>
            <ListItemText primary='JMcCay' style={{paddingLeft: '1em'}}/>
          </ListItem>
          <div className='nav-new-room-btn'>
            <NewRoomButton
              history={props.history}
              connection={props.connection}
              class='nav-btn'
            />
          </div>
        </List>
        <img className='logo' src='icon_a.png' alt='logo'/>
        <Divider />
        <div className='logout'>
          <Button variant="contained" color="primary" style={{width: '18vw'}}>
              Log Out
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
