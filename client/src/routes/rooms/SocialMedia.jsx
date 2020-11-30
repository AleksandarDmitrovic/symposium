import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton,  LinkedinIcon } from 'react-share';

export default function SocialMedia(props) {

  return (
    <div id='social-media'>
      <TwitterShareButton 
        title='Join my conversation on Symposium!'
        url={'https://the-symposium.herokuapp.com' + props.url} 
      >
        <TwitterIcon size={32} round={true}></TwitterIcon>
      </TwitterShareButton>
      <FacebookShareButton 
        quote={props.description}
        url={'https://the-symposium.herokuapp.com' + props.url} 
      >
        <FacebookIcon size={32} round={true}></FacebookIcon>
      </FacebookShareButton>
      <LinkedinShareButton 
        title={props.description}
        url={'https://the-symposium.herokuapp.com' + props.url} 
      >
        <LinkedinIcon size={32} round={true}></LinkedinIcon>
      </LinkedinShareButton>
    </div>
  );
}