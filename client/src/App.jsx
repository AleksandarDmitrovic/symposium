import { BrowserRouter, Route, Switch } from "react-router-dom";

import Conversation from "./routes/conversation_container/index";
import Room from "./routes/rooms/Room";
import NewRoomButton from "./routes/rooms/NewRoomButton";

export default function App() {
  return (
     <BrowserRouter>
       <Switch>
<<<<<<< HEAD
         <Route path="/" exact component={Conversation}/>
=======
         <Route path="/" exact component={NewRoomButton} />
>>>>>>> Add submit button on NewRoomForm
         <Route path="/room/:roomID" component={Room} />
       </Switch>
     </BrowserRouter>
  );
}