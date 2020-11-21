import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/rooms/CreateRoom";
import Call from "./routes/rooms/Call";

export default function App(){
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={CreateRoom} />
         <Route path="/room/:roomID" component={Call} />
       </Switch>
     </BrowserRouter>
  );
}