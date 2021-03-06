import React from "react";
import {getUser} from "../constants";

export default class Details extends React.Component{
  constructor(props){
    super(props)
    this.state={user: []}
  }

  componentDidMount(){
    getUser(this.props.match.params.login)
    .then(res => res.json())
    .then(data => this.setState({user: data}))
  }

  render(){
    const {avatar_url, login, name, company, blog, location, email, bio, public_repos, followers, following} = this.state.user
    return(
      <div className="Details">
        <div className="container">
          <div className="row py-5">
            <div className="col-md-4">
              <img className="img-fluid" src={avatar_url} alt=""/>
            </div>
            <div className="col-md-8">
              <p><strong>Username</strong><br/>{login}</p>
              <p><strong>Name</strong><br/> {name}</p>
              {company && <p><strong>Company</strong><br/> {company}</p>}
              {blog && <p><strong>Blog</strong><br/> {blog}</p>}
              {location && <p><strong>Location</strong><br/> {location}</p>}
              {email && <p><strong>Email</strong><br/> {email}</p>}
              {bio && <p><strong>Bio</strong><br/> {bio}</p>}
              <p><strong>Public Repositories</strong><br/>{public_repos}</p>
              <p><strong>Followers</strong><br/> {followers}</p>
              <p><strong>Following</strong><br/> {following}</p>
            </div>
            <span onClick={()=>this.props.history.goBack()}><i className="fas fa-arrow-left fa-3x text-dark back-arrow"></i></span>
          </div>
        </div>
      </div>
    )
  }
}
