import React from "react";
import User from "./User"
export default class Users extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user: [],
      inputVal: "",
      location: "",
      sort:"",
      showing: false
    }
    this.inputHandlerChange = this.inputHandlerChange.bind(this);
    this.inputHandlerSubmit = this.inputHandlerSubmit.bind(this);
    this.selectLocationChange = this.selectLocationChange.bind(this);
    this.selectSortChange = this.selectSortChange.bind(this);
    this.showing = this.showing.bind(this);
  }

    componentDidMount(){
      fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22&sort=${this.state.sort}`)
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

    selectLocationChange(event){
      this.setState({location: event.target.options[event.target.options.selectedIndex].value})
    }

    selectSortChange(event){
      this.setState({sort: event.target.options[event.target.options.selectedIndex].value})
    }


    inputHandlerSubmit(event){
      event.preventDefault()
      fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22&sort=${this.state.sort}`)
      .then(res => res.json())
      .then(res => this.setState({
        user: res
      }))
    }
  render(){
    if (this.state.user.length !== 0){
    return(
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={this.inputHandlerSubmit}>
                <div className="form-row">

                  <div className="form-group col-md">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" value={this.state.inputVal} onChange={this.inputHandlerChange}/>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="location">Location</label>
                    <select className="form-control" id="location" onChange={this.selectLocationChange}>
                      <option value="" defaultValue>World</option>
                      <option value="istanbul">İstanbul</option>
                      <option value="ankara">Ankara</option>
                      <option value="izmir">İzmir</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="sort">Sort by</label>
                    <select className="form-control" id="sort" onChange={this.selectSortChange}>
                      <option value="followers" defaultValue>Followers - High to Low</option>
                      <option value="repositories">Repositories - High to Low</option>
                    </select>
                  </div>
                </div>
                  <button className="btn btn-dark" type="submit">Search</button>
              </form>

              {this.state.showing && <div className="Notification">User Found</div>}
            </div>
          </div>
          <p className="lead">1-{this.state.user.items.length} of {this.state.user.total_count} results</p>
          <div className="row">
          {this.state.user.items.slice(0,30).map((item,index) => {
            return(
              <User key={Math.random()} index={index} {...item}/>
          )})}
          </div>
        </div>
      </div>
    )} else{
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
