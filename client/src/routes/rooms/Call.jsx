import Animal from "react-animals";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const Video = (props) => {
  const ref = useRef();
  
  // Hide video element from browser
  const displayVideo = useRef('inline')
  props.showAvatar ? displayVideo.current = 'none' : displayVideo.current = 'inline';

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, [props.peer]);

  return (
    <div className={'call-video other ' + props.id}>
      { props.showAvatar && props.avatar }
      <video playsInline autoPlay ref={ref} className='video' style={{display: displayVideo.current}}/>
    </div>
  );
}

/*
* ROOM COMPONENT - the actual chat between the peers
Every person who joins has a unique socket object created for them by socket.io. 
We will hold an array of objects in our peersRef array where the object will be a socket id to an actual peer object. This will allow us to create handshakes with each individual peer as they come and go.

When a person joins the room:
1. Assuming there are already others in the room, this person is now the initiator. 
2. They will notify everyone that they have joined. 
3. The server in turn will send them back an array of every other participant other than themselves, and for each one they will create a new peer using the createPeer function. 
4. The function creates a peer with initiator set to true, so we can immediatley emit the signal that we will be sending back to the others as soon as the construction of the peer happens. 

For people already in the room:
1. They will get notified by the server that someone else has joined.
2. They will receive a payload/newcomer object and call the addPeer function.
3. The function will create a peer with initiator set to false because we don't need the signal to be sent out right away. 
4. We accept the incoming signal, then take our own signal, fire it to server, and then it is sent back to the person who initially sent the joining signal.

For the person awaiting to join the room:
1. They will be listening until they received a returned signal.
2. They receive a payload/participant object
3. They dig through their array of peers to make sure they signal on the correct peer. 
4. They are now potentially receving x amount of signals based on who is in the room, so we need to know which one of the peers to use to accept the returning signal. 
*/

export default function Call(props) {
  const [peers, setPeers] = useState([]);

  // We keep track of the changes in the following refs without having to rerender the component
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  // Current state of users video
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [myVideoClass, setMyVideoClass] = useState('inline')
  const [isAudioActive, setIsAudioActive] = useState(true);

  // For rendering avatar, render forces rerender
  const otherBrowsersWithVideoToggledOff = useRef([]);  
  const [render, setRender] = useState(false);

  // Saving avatar
  const [myAvatar, setMyAvatar] = useState();

  // videoState to show video or avatar
  const roomID = props.roomID;

  // Material-ui
  const classes = useStyles();

  // TURN VIDEO ON AND OFF
  const toggleVideo = () => {
    // Toggle video to only send black pixels
    isVideoActive ? userVideo.current.srcObject.getTracks().find((track) => track.kind === 'video').enabled = false : userVideo.current.srcObject.getTracks().find((track) => track.kind === 'video').enabled = true;
    setIsVideoActive(!isVideoActive);

    // Hide element from browser
    myVideoClass === 'inline' ? setMyVideoClass('none') : setMyVideoClass('inline');

    // Inform other browsers to render avatar for this user
    socketRef.current.emit("toggle video", socketRef.current.id)
  };

  // TURN VIDEO ON AND OFF
  const toggleAudio = () => {
    isAudioActive ? userVideo.current.srcObject.getTracks().find((track) => track.kind === 'audio').enabled = false : userVideo.current.srcObject.getTracks().find((track) => track.kind === 'audio').enabled = true;
    setIsAudioActive(!isAudioActive);
  };

  // useEffect runs when someone joins the room
  useEffect(() => {
    socketRef.current = io.connect("/");
    // Get user's audio and video
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      // userVideo is a ref to the actual video (stream)
      userVideo.current.srcObject = stream;

      // Create myAvatar
      setMyAvatar(createAvatar());
      

      //* A NEW USER JOINS A ROOM WITH EXISTING PARTICIPANTS
      // Emit an event saying the user has joined the room
      socketRef.current.emit('join room', roomID);
      // get array of users (everyone in chat except from themselves)
      socketRef.current.on('all users', users => {

        // We have no peers yet because we have just joined. Create a peers array for rendering purposes as we need to know how many videos to render
        const peers = [];
        // iterate through each user in the room, creating a peer for each
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          const avatar = createAvatar()
          peersRef.current.push({
            peerID: userID, // the socketID for person we just created a peer for
            peer, // the peer object returned the from createPeer function
            avatar // the avatar to use for this user
          });
          peers.push({
            peerID: userID,
            peer,
          });
        });
        // Update Peers State
        setPeers(peers);
      });

      //* A PERSON ALREADY IN THE ROOM IS NOTIFIED THAT SOMEONE ELSE HAS JOINED
      socketRef.current.on('user joined', payload => {
        // Create a peer for the newcomer who just joined the room
        // Pass as paramaters signal, who is calling us, and our stream

        const peer = addPeer(payload.signal, payload.callerID, stream);
        const avatar = createAvatar()

        peersRef.current.push({
          peerID: payload.callerID,
          peer,
          avatar
        });

        //Object that includes peer and their id to make unique keys for the video components
        const peerObj = {
          peer,
          peerID: payload.callerID
        }
        // Update Peers State by adding the newly joined user to the existing array of participants
        setPeers(users => [...users, peerObj]);
        props.timer(true);
      });

      //* THE JOINING USER GETS THEIR RESPONSE
      socketRef.current.on('receiving returned signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      })

      socketRef.current.on('conversation started', () => {
        props.timer(true);
      });

    });

    // LEAVING USER
    socketRef.current.on("user left", id => {
      const peerObj = peersRef.current.find(p => p.peerID === id);
      if (peerObj) {
        peerObj.peer.destroy();
      }

      const peers = peersRef.current.filter(p => p.peerID !== id);
      peersRef.current = peers;
      setPeers(peers);
    })

    // Updates newMessage state triggering useEffect in ChatBox.jsx
    socketRef.current.on("update chat box", messageInfo => {
      if (messageInfo.message) {
        props.setNewMessage({ messageInfo })
      }
    });

    socketRef.current.on("user toggled video", userId => {
      checkAvatar(userId)
    })

  }, [roomID]);

  function checkAvatar(userId) { 
    // If otherBrowsersWithVideoToggledOff.current has the user's ID, this means that they had toggled their video off, but
    // have since toggled their video back on, so remove the userId from other users
    if (otherBrowsersWithVideoToggledOff.current.includes(userId)) {
      otherBrowsersWithVideoToggledOff.current = otherBrowsersWithVideoToggledOff.current.filter(id => id !== userId);
    } else {
      otherBrowsersWithVideoToggledOff.current.push(userId);
    }

    // Forces rerender
    setRender(prevState => !prevState);
  }

  

  // CHAT BOX 
  useEffect(() => {
    // Message goes to server.js which broadcasts "update chat box" to all other users in the room
    socketRef.current.emit("new message", { message: props.message, userId: socketRef.current.id })
  }, [props.message]);

  //* Function for creating peers when a user has joined a room with existing participants
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    // The newly constructed peer emits a signal immediately because we set initiator to true. This starts the peer-to-peer handshake
    peer.on('signal', signal => {
      // Emit signal down to the server, sending an object with the userID of everyone already in room, the joining user's ID, and the actual signal data
      socketRef.current.emit('sending signal', { userToSignal, callerID, signal })
    });

    return peer;
  }

  //* Function for creating a new individual peer for the person joining the room
  function addPeer(incomingSignal, callerID, stream) {
    // initiator set to false so signal is not fired on creation of Peer
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    // This will fire when it is notified that someone wants to make a connection with it
    peer.on('signal', signal => {
      // Receives incoming signal, and sends a signal back out to the server, which sends a signal to the callerID that called 
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    // triggers the on 'signal' command above
    peer.signal(incomingSignal);

    return peer;
  }

  const createAvatar = (userID) => {
    const allAvatars = 
      ['Alligator', 'anteater', 'armadillo', 'aurochs', 'axolotl', 'badger', 'bat', 'beaver', 'buffalo', 'camel', 
      'capybara', 'chameleon', 'cheetah', 'chinchilla', 'chipmunk', 'chupacabra', 'cormorant', 'coyote', 'crow', 
      'dingo', 'dinosaur', 'duck', 'elephant', 'ferret', 'fox', 'frog', 'giraffe', 'gopher', 'grizzly', 'hedgehog', 'hippo',
      'hyena', 'ibex', 'iguana', 'jackal', 'jackalope', 'kangaroo', 'koala', 'kraken', 'leopard', 'lemur', 
      'liger', 'loris', 'manatee', 'mink', 'monkey', 'moose', 'narwhal', 'orangutan', 'otter', 'panda', 
      'penguin', 'platypus', 'python', 'quagga', 'rabbit', 'raccoon', 'rhino', 'sheep', 'shrew', 'skunk', 
      'squirrel', 'tiger', 'turtle', 'walrus', 'wolf', 'wolverine', 'wombat'];
    const allColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'teal']

    const ranNumForName = Math.floor(Math.random() * 68); 
    const avatarName = allAvatars[ranNumForName];
    const ranNumForColor = Math.floor(Math.random() * 6); 
    const avatarColor = allColors[ranNumForColor];

    return <Animal name={avatarName} color={avatarColor} size="200px" />
  }

 
  return (
    <>
      <div className='call-container'>

        <div className='call-video me'>
          { !isVideoActive && myAvatar }
          <video muted ref={userVideo} autoPlay playsInline style={{display: myVideoClass}}/>
        </div>
        
        {peersRef.current.map((peer) => {
          // Checks if other browser has toggled their video off
          const showAvatar = otherBrowsersWithVideoToggledOff.current.includes(peer.peerID);
          return (
            <Video key={peer.peerID} peer={peer.peer} id={peer.peerID} showAvatar={showAvatar} avatar={peer.avatar} />
          )         
        })}

        <footer className="toggle-buttons">
          {isVideoActive && <Button
            variant="contained"
            color="secondary"
            className={"toggle video " + classes.button}
            startIcon={<VideocamIcon />}
            onClick={toggleVideo}
          />}
          {!isVideoActive && <Button
            variant="contained"
            color="secondary"
            className={"toggle video " + classes.button}
            startIcon={<VideocamOffIcon />}
            onClick={toggleVideo}
          />}

          {isAudioActive && <Button
            variant="contained"
            color="secondary"
            className={"toggle audio " + classes.button}
            startIcon={<MicIcon />}
            onClick={toggleAudio}
          />}
          {!isAudioActive && <Button
            variant="contained"
            color="secondary"
            className={"toggle audio " + classes.button}
            startIcon={<MicOffIcon />}
            onClick={toggleAudio}
          />}
        </footer>
        
      </div>
      
    </>
  );
} 