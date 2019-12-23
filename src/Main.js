import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Rankings from "./Rankings";
import Details from "./Details";

export default function Main(){
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/rankings" component={Rankings}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/details/:login" component={Details}/>
    </Switch>
  )
}
