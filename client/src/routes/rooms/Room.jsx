import React from 'react';
// import TopNav from './TopNav';
import Call from './Call';
// import ChatBox from './ChatBox';

export default function Room(props) {

  return (
    <main>
      {/* <nav>
        <TopNav />
      </nav> */}
      <section>
        <Call roomID = {props.match.params.roomID}/>
      </section>
      {/* <footer>
        <ChatBox />
      </footer> */}
    </main>
  );
}