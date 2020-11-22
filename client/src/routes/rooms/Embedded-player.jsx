export default function EmbedVideo (props) {

  const collectionID = '1441095668';
  const url = `https://embed.podcasts.apple.com/us/podcast/the-joe-rogan-experience-experience/id${collectionID}`
  console.log('url', url);

  return (
    <iframe src={url}></iframe>
  );
}
