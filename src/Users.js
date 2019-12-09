import React from "react";

class Users extends React.Component{
  constructor(){
    super()
    this.state=({
      users:[],
      inputVal:"",
      showing: false,
      username:"",
      followers: 0,
      following: 0,
      repos: 0,
      bio: "",
      error: "",
      avatar: "https://avatars1.githubusercontent.com/u/810438?s=460&v=4",
      showing: false})
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch("https://api.github.com/users")
    .then(res => res.json())
    .then(res => this.setState({
      users: res
    }))
    fetch(`https://api.github.com/users/gaearon`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        username: data.name,
        repos: data.public_repos,
        avatar: data.avatar_url,
        bio: data.bio,
        followers: data.followers,
        following: data.following
      })
    })
  }

  handleSearch(event){
    this.setState({inputVal: event.target.value})
  }
  showing(){
    this.setState({showing: true},()=>setTimeout(()=>this.setState({showing: false}),1500))
  }

  handleSubmit(event){
    event.preventDefault();
    fetch(`https://api.github.com/users/${this.state.inputVal}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.message){
        this.setState({error: data.message})
      } else {
      this.showing();
      this.setState({
        username: data.name,
        repos: data.public_repos,
        avatar: data.avatar_url,
        bio: data.bio,
        followers: data.followers,
        following: data.following
      },()=>this.setState({inputVal: ""})
    )
      this.setState({error: null})
    }
    })
  }

  render(){
    return(
      <div style={{height: "90vh",width: "50%", margin: "0 auto"}}>
        <form onSubmit={this.handleSubmit}>
          <input placeholder={"Username"} value={this.state.inputVal} onChange={this.handleSearch}/>
          <button type="submit">Search</button>
        </form>
        {this.state.showing && <p className="Notification">User Found</p>}
        {this.state.error ? <p>{this.state.error}</p> : <div className="card">
          <img alt="" style={{width: "100%"}} src={this.state.avatar}/>
          <div className="container">
            <h4><b>{this.state.username}</b></h4>
            <p>Followers: {this.state.followers}</p>
            <p>Following: {this.state.following}</p>
            <p>Repositories: {this.state.repos}</p>
            {this.state.bio ? <p>Bio: {this.state.bio}</p> : null}
          </div>
        </div>}
      </div>
    )
  }
}

export default Users
