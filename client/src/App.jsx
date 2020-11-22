import { BrowserRouter, Route, Switch } from "react-router-dom";

import Conversation from "./routes/conversation_container/index";
import Room from "./routes/rooms/Room";

export default function App() {
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={Conversation}/>
         <Route path="/room/:roomID" component={Room} />
       </Switch>
     </BrowserRouter>
  );
}