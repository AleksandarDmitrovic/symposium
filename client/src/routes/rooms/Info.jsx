import React from 'react';
import SocialMedia from './SocialMedia';

import EmbedPodcast from './EmbedPodcast'

import './room.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


export default function Info(props) {

  return (
    <Card className="podcast-card"> 
      <CardMedia
        className="podcast-image"
        image={props.podcast_image}
        title="Podcast Image"
      />  
      <div className="podcast">
        <EmbedPodcast 
          embed_title = {props.embed_title}
          embed_url = {props.embed_url}
          title = {props.episode_title}
          class = {'room-player'}
        />
      </div>  
      <div class="conversation-information">
        <SocialMedia 
          description={props.description}
          url={props.url}
        />
      </div> 
    </Card>
  )
}