import React from "react";

export default function Contact(){
  return(
    <div className="container">
      <form className="mb-5">
        <div className="row">
          <div className="col-md">
            <div className="form-group">
              <h4 className="display-4">Get in touch</h4>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name"/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email"/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Subject"/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm">
            <div className="form-group">
              <textarea className="form-control" placeholder="Enter your message"/>
            </div>
          </div>
        </div>

        <button className="btn btn-dark" type="button">Submit</button>
      </form>
    </div>
  )
}
