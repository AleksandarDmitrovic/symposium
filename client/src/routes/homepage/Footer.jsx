import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer(props) {

  const [podcast, setPodcast] = useState('');

  useEffect(() => {
    axios.get('/api/podcastOfDay').then(res => {
      setPodcast(res.embed_url);
    })
    .catch(() => 'Error receiving Podcast of the Day');
  }, []);

  return (
    <footer className='pod-of-day'>
      {podcast}
    </footer>
  )
}