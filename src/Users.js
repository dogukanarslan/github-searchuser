import React from "react";

export default class Users extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user: [],
      inputVal: "",
      showing: false,
    }
    this.inputHandlerChange = this.inputHandlerChange.bind(this);
    this.inputHandlerSubmit = this.inputHandlerSubmit.bind(this);
    this.showing = this.showing.bind(this);
  }

    componentDidMount(){
      fetch("https://api.github.com/users/gaearon")
      .then(res => res.json())
      .then(res => this.setState({
        user: res
      }))
    }

    showing(){
      this.setState({showing: true},()=>setTimeout(()=>this.setState({showing: false}),1500))
    }

    inputHandlerChange(event){
      this.setState({inputVal: event.target.value})
    }


    inputHandlerSubmit(event){
      event.preventDefault()
      fetch(`https://api.github.com/users/${this.state.inputVal}`)
      .then(res => res.json())
      .then(data => {
        if (data.message){
          console.log(data.message)
        } else {
        this.showing();
        this.setState({
          user: data,
          inputVal: ""
        })
      }
      })
    }
  render(){
    return(
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <form onSubmit={this.inputHandlerSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input className="form-control" type="text" id="username" value={this.state.inputVal} onChange={this.inputHandlerChange}/>
                </div>
                <button className="btn btn-dark btn-lg" type="submit">Search</button>
              </form>
              {this.state.showing && <div className="Notification">User Found</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-10">
              <div className="card">
                <img src={this.state.user.avatar_url} className="card-img-top" alt="avatar"/>
                <div className="card-body">
                  <h5 className="card-title">{this.state.user.name}</h5>
                  <p className="card-text">Followers: {this.state.user.followers}</p>
                  <p className="card-text">Following: {this.state.user.following}</p>
                  <p className="card-text">Repositories: {this.state.user.public_repos}</p>
                  {this.state.user.bio && <p>Bio: {this.state.user.bio}</p>}
                  <a href={`https://github.com/${this.state.user.login}`} className="btn btn-outline-dark">Visit Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
