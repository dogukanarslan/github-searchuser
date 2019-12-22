import React from "react";
import Ranking from "./Ranking"
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
    .then(res => this.setState({
      allData: res
    }))
    fetch(`https://api.github.com/search/users?q=location:%22istanbul%22&sort=followers`)
    .then(res => res.json())
    .then(res => this.setState({
      istanbulData: res
    }))
    fetch(`https://api.github.com/search/users?q=location:%22ankara%22&sort=followers`)
    .then(res => res.json())
    .then(res => this.setState({
      ankaraData: res
    }))
  }


  render(){
    if(this.state.allData.length !== 0 && this.state.istanbulData.length!== 0 && this.state.ankaraData.length !== 0 && !this.state.allData.hasOwnProperty("message") && !this.state.istanbulData.hasOwnProperty("message") && !this.state.ankaraData.hasOwnProperty("message")) {
    return(
      <div className="rankings">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Top 3 Developers</h1>
            <p className="lead">Most followed developers around the world and various cities of Turkey</p>
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
              <Ranking key={Math.random()} {...item}/>
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
              <Ranking key={Math.random()} {...item}/>
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
              <Ranking key={Math.random()} {...item}/>
          )})}
          </div>
        </div>
      </div>
    )}else{
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
