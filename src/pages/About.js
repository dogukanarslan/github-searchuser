import React from "react";

export default function About(){
  return(
    <div className="container">
      <div className="row text-center my-5">
        <div className="col">
          <h2>Github Search Documentation</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h4><i className="fas fa-book"></i> Github Search Manual</h4>
          <hr/>
          <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida.
          </p>
        </div>
        <div className="col-md-4">
          <h4><i className="fas fa-cog"></i> API Limitations</h4>
          <hr/>
          <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida.
          </p>
        </div>
        <div className="col-md-4">
          <h4><i class="fas fa-comment-alt"></i> Github Search Forum</h4>
          <hr/>
          <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra consequat quam et maximus. Cras et lorem convallis, efficitur nisl ut, cursus lorem. Praesent gravida accumsan dignissim. Nunc efficitur in libero sed malesuada. Proin quis rhoncus ipsum. Etiam pellentesque consequat felis eget laoreet. Nullam viverra at metus nec gravida.
          </p>
        </div>
      </div>
      <div className="row text-center my-2">
        <div className="col">
          <h2>Technologies</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md">
          <i className="fab fa-html5 fa-7x"></i>
          <p className="lead">HTML</p>
        </div>
        <div className="col-md">
          <i className="fab fa-css3-alt fa-7x"></i>
          <p className="lead">CSS</p>
        </div>
        <div className="col-md">
          <i className="fab fa-js-square fa-7x"></i>
          <p className="lead">JavaScript</p>
        </div>
        <div className="col-md">
          <i className="fab fa-react fa-7x"></i>
          <p className="lead">React</p>
        </div>
        <div className="col-md">
          <i className="fab fa-bootstrap fa-7x"></i>
          <p className="lead">Bootstrap</p>
        </div>
      </div>
    </div>

  )
}
