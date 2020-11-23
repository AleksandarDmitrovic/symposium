import { useState, useEffect } from 'react';

export default function Episodes(props) {

  const [val, setVal] = useState({});

  // console.log('in episode, this is episodes', props.episodes)

  const listTitles = titles => {
    return titles.map(title => {
      return (
        <option key={title.embed_title} value={title}>{title.embed_title}</option>
      );
    });
  }

  // useEffect(() => {
  //   // props.changeEpisodeInfo(val);
  //   let x = document.getElementById('episode-list');
  //   console.log(x)
  // }, [val]);

  return (
    <select id='episode-list' value={val} onChange={() => setVal()}>
      <option value='none'>Episode:</option>
      {listTitles(props.episodes)}
    </select>
  );

  // Dummy data - always setting to {embed_title: 'test', embed_url: 'test'}
  // return (
  //   <select id='episode-list' onChange={() => props.changeEpisodeInfo({embed_title: 'test', embed_url: 'test'})}>
  //     <option value='none'>Episode:</option>
  //     {listTitles(props.episodes)}
  //   </select>
  // );
}