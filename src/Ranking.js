import React from "react";

export default function Ranking(props){
  return(
    <div className="col-md">
      <div className="card mb-4">
        <img className="card-img-top" src={props.avatar_url} alt=""/>
        <div className="card-body">
          <h4 className="card-title lead">{props.login}</h4>
          <a className="btn btn-outline-dark" href={props.html_url}>Go Profile</a>
        </div>
      </div>
    </div>
  )
}
