import React from "react";
import {Link} from "react-router-dom";

export default function Header(){
  return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="#"><i className="fab fa-github fa-2x"></i></a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/rankings">Rankings</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}
