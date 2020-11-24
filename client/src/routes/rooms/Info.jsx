import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './room.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Info(props) {
  const altImage = "https://images.unsplash.com/photo-1556761175-129418cb2dfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80";

  const classes = useStyles();

  return (
  <Card className="podcast-card">
    {/* <div className='info'> */}
      <img src={props.podcast_image} alt={altImage} />
      {/* <CardMedia
          className={classes.media}
          image={props.podcast_image}
          title="Podcast Image"
        /> */}
      <ul>
        <li><b>Title : </b>{props.title}</li>
        <li><b>Description : </b>{props.description}</li>
        <li><b>Podcast : </b>{props.podcast_name}</li>
        <li><b>Timestamp : </b>{props.podcast_starts_at} - {props.podcast_ends_at}</li>
        <li><b>Category : </b>{props.category}</li>
      </ul>
    {/* </div> */}
  </Card>
  )
}