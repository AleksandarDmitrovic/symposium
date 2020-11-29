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
    <footer className='pod-of-day'>
      <p>Listen to what people are talking about today</p>
      <EmbedPodcast embed_url={data.podcast_episode_embed_url} title={props.title} />
      <div id='footer-pod-info'>
        <p>{data.podcast_name}</p>
        <p>{data.podcast_episode_title}</p>
      </div>
    </footer>
  );
}