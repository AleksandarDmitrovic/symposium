import Axios from "axios";
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Conversation from "./routes/conversation_container/index";
import axios from 'axios';


export default function App() {

 



  return (
     <BrowserRouter>
       <Switch>
         <Route path="/" exact>
          <Conversation 
          />
         
         </Route>
       </Switch>
     </BrowserRouter>
  );
}