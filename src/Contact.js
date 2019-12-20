import React from "react";

export default function Contact(){
  return(
    <div className="container">
      <form>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <h4 className="display-2">Get in touch</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <textarea className="form-control" placeholder="Enter your message"/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Name"/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">Submit</button>
      </form>
    </div>
  )
}
