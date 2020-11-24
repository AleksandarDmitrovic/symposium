import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton,  LinkedinIcon } from 'react-share';

export default function SocialMedia(props) {

  // props.url = url of open room 
  // replace url for each button with heroku url with props.url appended to the end of it
  // ie "heroku.com/${props.url}""

  console.log(props)

  return (
    <div id='social-media'>
      <TwitterShareButton 
        title={props.description}
        url={'https://github.com/AleksandarDmitrovic/symposium/tree/feature/episode-select'} 
      >
        <TwitterIcon size={32} round={true}></TwitterIcon>
      </TwitterShareButton>
      <FacebookShareButton 
        quote={props.description}
        url={'https://github.com/AleksandarDmitrovic/symposium/tree/feature/episode-select'} 
      >
        <FacebookIcon size={32} round={true}></FacebookIcon>
      </FacebookShareButton>
      <LinkedinShareButton 
        title={props.description}
        url={'https://github.com/AleksandarDmitrovic/symposium/tree/feature/episode-select'} 
      >
        <LinkedinIcon size={32} round={true}></LinkedinIcon>
      </LinkedinShareButton>
    </div>
  );
}