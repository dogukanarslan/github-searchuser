import React from "react";

export default function Footer(){
  return(
    <footer className="Footer bg-dark">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md">
            <i className="fab fa-github fa-2x text-white mb-2"></i>
            <h1 className="small text-muted">&copy; 2019</h1>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-muted">Features</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Cool stuff</a></li>
              <li><a className="text-muted" href="#">Random feature</a></li>
              <li><a className="text-muted" href="#">Team feature</a></li>
              <li><a className="text-muted" href="#">Stuff for developers</a></li>
              <li><a className="text-muted" href="#">Another one</a></li>
              <li><a className="text-muted" href="#">Last time</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-muted">Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Resource</a></li>
              <li><a className="text-muted" href="#">Resource name</a></li>
              <li><a className="text-muted" href="#">Another resource</a></li>
              <li><a className="text-muted" href="#">Final resource</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-muted">Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Business</a></li>
              <li><a className="text-muted" href="#">Education</a></li>
              <li><a className="text-muted" href="#">Government</a></li>
              <li><a className="text-muted" href="#">Gaming</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-muted">About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Team</a></li>
              <li><a className="text-muted" href="#">Locations</a></li>
              <li><a className="text-muted" href="#">Privacy</a></li>
              <li><a className="text-muted" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
