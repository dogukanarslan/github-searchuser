import React from "react";

export default function About(){
  return(
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <p className="display-2">Tools</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-4">
          <p className="lead">HTML</p>
        </div>
        <div className="col-4">
          <p className="lead">CSS</p>
        </div>
        <div className="col-4">
          <p>JavaScript</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <p className="display-2">Libraries</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-6">
          <p className="lead">React</p>
        </div>
        <div className="col-6">
          <p className="lead">Bootstrap</p>
        </div>
      </div>
    </div>

  )
}
