import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/rooms/CreateRoom";
import Room from "./routes/rooms/Room";
import NewRoomButton from "./routes/rooms/NewRoomButton";

export default function App() {
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={NewRoomButton} />
         <Route path="/room/:roomID" component={Room} />
       </Switch>
     </BrowserRouter>
  );
}