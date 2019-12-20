import React from "react";
import {filters} from "./constants";

export default class Statistics extends React.Component{
  constructor(props){
    super(props)
    this.state={
      allData: [],
      istanbulData: [],
      ankaraData:[]
    }
  }

  componentDidMount(){
    fetch(`https://api.github.com/search/users?q=location:%22%22&sort=followers`)
    .then(res => res.json())
    .then(data => this.setState({allData: data}))
    fetch(`https://api.github.com/search/users?q=location:%22istanbul%22&sort=followers`)
    .then(res => res.json())
    .then(data => this.setState({istanbulData: data}))
    fetch(`https://api.github.com/search/users?q=location:%22ankara%22&sort=followers`)
    .then(res => res.json())
    .then(data => this.setState({ankaraData: data}))
  }

  render(){
    if(this.state.allData.length !== 0 && !this.state.allData.hasOwnProperty("message")) {
    return(
      <div className="rankings">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Top 3 Developers</h1>
            <p className="lead">Most followed developers around the world and different cities of Turkey</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="mb-2 text-center">
                <h4 className="display-2">World</h4>
              </div>
            </div>
          </div>
          <div className="row">
          {this.state.allData.items.slice(0,3).map(item => {
            return(
            <div className="col-xl-4 col-sm-12">
              <div className="card">
                <img className="card-img-top" src={item.avatar_url}/>
                <div className="card-body">
                  <h4 className="card-title">{item.login}</h4>
                  <a className="btn btn-dark" href={item.html_url}>Go Profile</a>
                </div>
              </div>
            </div>
          )})}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <div className="mb-2 text-center">
                <h4 className="display-2">Istanbul</h4>
              </div>
            </div>
          </div>
          <div className="row">
          {this.state.istanbulData.items.slice(0,3).map(item => {
            return(
            <div className="col-xl-4 col-sm-12">
              <div className="card">
                <img className="card-img-top" src={item.avatar_url}/>
                <div className="card-body">
                  <h4 className="card-title">{item.login}</h4>
                  <a className="btn btn-dark" href={item.html_url}>Go Profile</a>
                </div>
              </div>
            </div>
          )})}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <div className="mb-2 text-center">
                <h4 className="display-2">Ankara</h4>
              </div>
            </div>
          </div>
          <div className="row">
          {this.state.ankaraData.items.slice(0,3).map(item => {
            return(
            <div className="col-xl-4 col-sm-12">
              <div className="card">
                <img className="card-img-top" src={item.avatar_url}/>
                <div className="card-body">
                  <h4 className="card-title">{item.login}</h4>
                  <a className="btn btn-dark" href={item.html_url}>Go Profile</a>
                </div>
              </div>
            </div>
          )})}
          </div>
        </div>
      </div>
    )}else{
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )
    }
  }
}
