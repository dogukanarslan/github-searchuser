import React from "react";

export default function About(){
  return(
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <p className="display-4">Github Search</p>
          <p className="lead">
            Github Search is an application that you can filter and search Github users
          </p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <p className="display-4">Tools</p>
          <hr className="my-4"/>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-4">
          <i className="fab fa-html5 fa-7x"></i>
          <p className="lead">HTML</p>
        </div>
        <div className="col-4">
          <i className="fab fa-css3-alt fa-7x"></i>
          <p className="lead">CSS</p>
        </div>
        <div className="col-4">
          <i className="fab fa-js-square fa-7x"></i>
          <p className="lead">JavaScript</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <p className="display-4">Libraries</p>
          <hr className="my-4"/>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-6">
          <i className="fab fa-react fa-7x"></i>
          <p className="lead">React</p>
        </div>
        <div className="col-6">
          <i className="fab fa-bootstrap fa-7x"></i>
          <p className="lead">Bootstrap</p>
        </div>
      </div>
    </div>

  )
}
