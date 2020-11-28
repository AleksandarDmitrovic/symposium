import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import { Menu, AccountCircle, ChevronLeft, ChevronRight, Home }  from '@material-ui/icons';
import './conversation-styles/index.scss';
import './conversation-styles/sideNav.scss';

const drawerWidth = '20vw';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'fixed'
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
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  const theme = useTheme();
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.getElementsByClassName('convo-list')[0].style.paddingLeft = '24vw';
      document.getElementsByClassName('convo-list')[0].style.paddingRight = '4vw';
      document.getElementsByClassName('fixed')[0].style.marginLeft = '23vw';
      document.getElementsByClassName('new-room-button')[0].style.marginLeft = '23vw';
      // document.getElementsByClassName('pod-of-day')[0].style.marginLeft = '20vw';
    } else {
      document.getElementsByClassName('convo-list')[0].style.paddingLeft = '12vw';
      document.getElementsByClassName('convo-list')[0].style.paddingRight = '12vw';
      document.getElementsByClassName('fixed')[0].style.marginLeft = '13vw';
      document.getElementsByClassName('new-room-button')[0].style.marginLeft = '13vw';
      // document.getElementsByClassName('pod-of-day')[0].style.marginLeft = '0';
    }
  }, [open]);

  return (
    <div className={classes.root}>
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
        <Typography style={{fontFamily: "'Raleway', sans-serif"}}variant="h6" noWrap>
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
        <div className={classes.drawerHeader}>
          <h3 className='nav-title'>Symposium</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List className='nav-list'>
        <ListItem button>
            <ListItemIcon> <Home /> </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
          <button type='button'>Create a Conversation Room</button>
          <ListItem button>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary='Example User'/>
          </ListItem>
          <button type='button'>Log Out</button>
        </List>
        <img className='logo' src='icon_c.png' alt='logo'/>
      </Drawer>
    </div>
  );
}
