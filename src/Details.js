import React from "react";

export default class Details extends React.Component{
  constructor(props){
    super(props)
    this.state={user: []}
  }

  componentDidMount(){

    fetch(`https://api.github.com/users/${this.props.match.params.login}`)
    .then(res => res.json())
    .then(data => this.setState({user: data}))
  }

  render(){
  return(
    <div className="Details">
    {console.log(this.props)}
      <div className="container">
        <div className="row py-5">
          <div className="col-md-4">
            <img className="img-fluid" src={this.state.user.avatar_url} alt=""/>
          </div>
          <div className="col-md-8">
            <p><strong>Username</strong><br/>{this.state.user.login}</p>
            <p><strong>Name</strong><br/> {this.state.user.name}</p>
            {this.state.user.company && <p><strong>Company</strong><br/> {this.state.user.company}</p>}
            {this.state.user.blog && <p><strong>Blog</strong><br/> {this.state.user.blog}</p>}
            {this.state.user.location && <p><strong>Location</strong><br/> {this.state.user.location}</p>}
            {this.state.user.email && <p><strong>Email</strong><br/> {this.state.user.email}</p>}
            {this.state.user.bio && <p><strong>Bio</strong><br/> {this.state.user.bio}</p>}
            <p><strong>Public Repositories</strong><br/>{this.state.user.public_repos}</p>
            <p><strong>Followers</strong><br/> {this.state.user.followers}</p>
            <p><strong>Following</strong><br/> {this.state.user.following}</p>
          </div>
          <span onClick={()=>this.props.history.goBack()}><i className="fas fa-arrow-left fa-3x text-dark back-arrow"></i></span>
        </div>
      </div>
    </div>
  )}
}
