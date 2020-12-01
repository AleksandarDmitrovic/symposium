import { useState, useEffect } from 'react';
import EmbedPodcast from '../rooms/EmbedPodcast';
import axios from 'axios';

export default function Footer(props) {

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/podcastOfDay').then(res => {
      setData(res.data);
    })
    .catch(() => 'Error receiving Podcast of the Day');
  }, []);

  return (
    // <footer className='pod-of-day' data-cy='pod-of-day'>
    //   <EmbedPodcast 
    //     embed_url={data.podcast_episode_embed_url} 
    //     title={data.podcast_name} 
    //     className='footer-player'
    //     layout={"stacked-reverse"}
    //     name={data.podcast_name} 
    //     episode={data.podcast_episode_title}
    //   />
    // </footer>
    <footer className='pod-of-day' data-cy='pod-of-day'>
      <EmbedPodcast 
        embed_url={data.url} 
        title={data.podcast_name} 
        className='footer-player'
        layout={"stacked-reverse"}
        name={data.podcast_name} 
        episode={data.episode_name}
      />
    </footer>
  );
}