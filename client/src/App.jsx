import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/rooms/CreateRoom";
import Room from "./routes/rooms/Room";

export default function App(){
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={CreateRoom} />
         <Route path="/room/:roomID" component={Room} />
       </Switch>
     </BrowserRouter>
  );
}