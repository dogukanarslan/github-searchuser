import React from "react";

export default function User(props){
  return(
    <div className="col-6 col-md-3">
      <div className="card mb-4">
        <img className="card-img-top" src={props.avatar_url} alt=""/>
        <div className="card-body">
          <h4 className="card-title small">{props.index===0&&<i className="fas fa-trophy"></i>} {props.login}</h4>
          <a className="btn btn-outline-dark btn-sm" href={props.html_url}>Visit Profile</a>
        </div>
      </div>
    </div>
  )
}
