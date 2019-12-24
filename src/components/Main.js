import React from "react";
import {Switch, Route} from "react-router-dom";
import {Home} from "../pages";
import {About} from "../pages";
import {Contact} from "../pages";
import {Rankings} from "../pages";
import {Details} from "../pages";

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
