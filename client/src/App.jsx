import { BrowserRouter, Route, Switch } from "react-router-dom";
import Conversation from "./routes/conversation_container/index";

export default function App() {
  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact component={Conversation} />
       </Switch>
     </BrowserRouter>
  );
}