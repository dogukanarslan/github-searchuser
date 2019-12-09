import React from "react";
import {Link} from "react-router-dom";

export default function Header(){
  return(
    <ul className="navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  )
}
