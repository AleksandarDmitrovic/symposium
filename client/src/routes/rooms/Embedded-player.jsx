export default function EmbedVideo (props) {

  const collectionID = '1408856271';
  const url = `https://embed.podcasts.apple.com/us/podcast/the-joe-rogan-experience-experience/id${collectionID}`
  console.log('url', url);

  return (
    <iframe src={url}></iframe>
  );
}
