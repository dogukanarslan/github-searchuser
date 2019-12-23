import React from "react";
import User from "./User"
export default class Users extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user: [],
      inputVal: "",
      location: "",
      language: "",
      sort:"followers",
      itemsPerPage:40,
      pageNumber: 1,
      lowerLimit: 1
    }

    this.inputHandlerChange = this.inputHandlerChange.bind(this);
    this.inputHandlerSubmit = this.inputHandlerSubmit.bind(this);
    this.selectLocationChange = this.selectLocationChange.bind(this);
    this.selectSortChange = this.selectSortChange.bind(this);
    this.selectLanguageChange = this.selectLanguageChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

    componentDidMount(){
      fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22+language:%22${this.state.language}%22&sort=${this.state.sort}&per_page=${this.state.itemsPerPage}`)
      .then(res => res.json())
      .then(res => this.setState({
        user: res
      }))
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

    selectLanguageChange(event){
      this.setState({language: event.target.options[event.target.options.selectedIndex].value})
    }


    inputHandlerSubmit(event){
      event.preventDefault()
      fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22+language:%22${this.state.language}%22&sort=${this.state.sort}&per_page=${this.state.itemsPerPage}`)
      .then(res => res.json())
      .then(res => this.setState({
        user: res,
        lowerLimit: 1,
        upperLimit: this.state.itemsPerPage
      }))
    }

    nextPage(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({pageNumber: this.state.pageNumber+1, lowerLimit: this.state.itemsPerPage + this.state.lowerLimit},
        ()=>
        fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22+language:%22${this.state.language}%22&sort=${this.state.sort}&page=${this.state.pageNumber}&per_page=${this.state.itemsPerPage}`)
        .then(res => res.json())
        .then(res => this.setState({
          user: res
        }))
      )
    }

    previousPage(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({pageNumber: this.state.pageNumber-1, lowerLimit: this.state.lowerLimit - this.state.itemsPerPage},
        ()=>
        fetch(`https://api.github.com/search/users?q=${this.state.inputVal}location:%22${this.state.location}%22+language:%22${this.state.language}%22&sort=${this.state.sort}&page=${this.state.pageNumber}&per_page=${this.state.itemsPerPage}`)
        .then(res => res.json())
        .then(res => this.setState({
          user: res
        }))
      )
    }

  render(){
    if (this.state.user.length !== 0 && !this.state.user.hasOwnProperty("message")){
    return(
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col">
              <form className="my-3"onSubmit={this.inputHandlerSubmit}>
                <div className="form-row">

                  <div className="form-group col-md-3">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" value={this.state.inputVal} onChange={this.inputHandlerChange}/>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="location">Location</label>
                    <select className="form-control" id="location" onChange={this.selectLocationChange}>
                      <option value="" defaultValue>World</option>
                      <option value="istanbul">İstanbul</option>
                      <option value="ankara">Ankara</option>
                      <option value="izmir">İzmir</option>
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="languages">Language</label>
                    <select className="form-control" id="languages" onChange={this.selectLanguageChange}>
                      <option value="" defaultValue>All</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="ruby">Ruby</option>
                      <option value="c">C</option>
                      <option value="csharp">C#</option>
                      <option value="pascal">Pascal</option>
                      <option value="fortran">Fortran</option>
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="sort">Sort by</label>
                    <select className="form-control" id="sort" onChange={this.selectSortChange}>
                      <option value="followers" defaultValue>Followers - High to Low</option>
                      <option value="repositories">Repositories - High to Low</option>
                    </select>
                  </div>
                </div>
                  <button className="btn btn-dark" type="submit">Search</button>
              </form>
            </div>
          </div>
          <p className="lead">{this.state.lowerLimit}-{this.state.lowerLimit + this.state.user.items.length - 1} of {this.state.user.total_count} results</p>

          <div className="row">
          {this.state.user.items.slice(0,this.state.itemsPerPage).map((item,index) => {
            return(
              <User key={Math.random()} {...item}/>
          )})}
          </div>

          <nav>
            <ul className="pagination justify-content-between">
              {this.state.lowerLimit === 1 ?
                <button disabled className="btn btn-dark" onClick={this.previousPage}>
                  &laquo; Previous Page
                </button>:
                <button className="btn btn-dark" onClick={this.previousPage}>
                  &laquo; Previous Page
                </button>
              }

                {this.state.lowerLimit + this.state.user.items.length - 1 === this.state.user.total_count ?
                  <button disabled className="btn btn-dark" onClick={this.nextPage}>
                    Next Page &raquo;
                  </button>:
                  <button className="btn btn-dark" onClick={this.nextPage}>
                    Next Page &raquo;
                  </button>
                }

            </ul>
          </nav>

        </div>
      </div>
    )} else{
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
              <p className="lead">Loading</p>
            </div>
          </div>
        </div>
      )
    }
  }
}
