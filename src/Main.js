import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";

export default function Main (){
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
    </Switch>
  )
}
