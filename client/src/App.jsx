// import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";

export default function App() {
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={CreateRoom} />
         <Route path="/room/:roomID" component={Room} />
       </Switch>
     </BrowserRouter>
  );
}