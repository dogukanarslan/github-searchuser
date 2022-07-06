import React from 'react'
import User from './User'
import Option from './Option'
import { getUsers, options } from '../constants'
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
    <ContentLoader
        height={446}
        width={350}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="0" y="0" rx="0" ry="0" width="350" height="348" />
        <rect x="20" y="380" rx="0" ry="0" width="80" height="10" />
        <rect x="20" y="400" rx="5" ry="5" width="100" height="25" />
    </ContentLoader>
)

export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            inputVal: '',
            location: '',
            language: '',
            sort: 'followers',
            itemsPerPage: 40,
            pageNumber: 1,
            lowerLimit: 1,
        }
        this.inputHandlerChange = this.inputHandlerChange.bind(this)
        this.inputHandlerSubmit = this.inputHandlerSubmit.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
    }

    componentDidMount() {
        getUsers(
            this.state.inputVal,
            this.state.location,
            this.state.language,
            this.state.sort,
            1,
            this.state.itemsPerPage
        )
            .then((res) => res.json())
            .then((res) =>
                this.setState({
                    user: res,
                })
            )
    }

    inputHandlerChange(event) {
        this.setState({ inputVal: event.target.value })
    }

    selectChange(event, type) {
        this.setState({
            [event.target.id]:
                event.target.options[event.target.options.selectedIndex].value,
        })
    }

    inputHandlerSubmit(event) {
        event.preventDefault()
        getUsers(
            this.state.inputVal,
            this.state.location,
            this.state.language,
            this.state.sort,
            1,
            this.state.itemsPerPage
        )
            .then((res) => res.json())
            .then((res) =>
                this.setState({
                    user: res,
                    lowerLimit: 1,
                })
            )
    }

    nextPage() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.setState(
            {
                pageNumber: this.state.pageNumber + 1,
                lowerLimit: this.state.itemsPerPage + this.state.lowerLimit,
            },
            () =>
                getUsers(
                    this.state.inputVal,
                    this.state.location,
                    this.state.language,
                    this.state.sort,
                    this.state.pageNumber,
                    this.state.itemsPerPage
                )
                    .then((res) => res.json())
                    .then((res) =>
                        this.setState({
                            user: res,
                        })
                    )
        )
    }

    previousPage() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.setState(
            {
                pageNumber: this.state.pageNumber - 1,
                lowerLimit: this.state.lowerLimit - this.state.itemsPerPage,
            },
            () =>
                getUsers(
                    this.state.inputVal,
                    this.state.location,
                    this.state.language,
                    this.state.sort,
                    this.state.pageNumber,
                    this.state.itemsPerPage
                )
                    .then((res) => res.json())
                    .then((res) =>
                        this.setState({
                            user: res,
                        })
                    )
        )
    }

    render() {
        if (
            this.state.user.length !== 0 &&
            !this.state.user.hasOwnProperty('message')
        ) {
            return (
                <div className="Home">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <form
                                    className="my-3"
                                    onSubmit={this.inputHandlerSubmit}
                                >
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="username"
                                                value={this.state.inputVal}
                                                onChange={
                                                    this.inputHandlerChange
                                                }
                                            />
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="location">
                                                Location
                                            </label>
                                            <select
                                                className="form-control"
                                                id="location"
                                                onChange={this.selectChange}
                                            >
                                                {options.locationOptions.map(
                                                    (location) => {
                                                        return (
                                                            <Option
                                                                key={
                                                                    location.name
                                                                }
                                                                {...location}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="language">
                                                Language
                                            </label>
                                            <select
                                                className="form-control"
                                                id="language"
                                                onChange={this.selectChange}
                                            >
                                                {options.languageOptions.map(
                                                    (language) => {
                                                        return (
                                                            <Option
                                                                key={
                                                                    language.name
                                                                }
                                                                {...language}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="sort">
                                                Sort by
                                            </label>
                                            <select
                                                className="form-control"
                                                id="sort"
                                                onChange={this.selectChange}
                                            >
                                                {options.sortOptions.map(
                                                    (sort) => {
                                                        return (
                                                            <Option
                                                                key={sort.name}
                                                                {...sort}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-dark"
                                        type="submit"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                        <p className="lead">
                            {this.state.lowerLimit}-
                            {this.state.lowerLimit +
                                this.state.user.items.length -
                                1}{' '}
                            of {this.state.user.total_count} results
                        </p>

                        <div className="row">
                            {this.state.user.items
                                .slice(0, this.state.itemsPerPage)
                                .map((item, index) => {
                                    return (
                                        <User
                                            key={item.id}
                                            page={'home'}
                                            {...item}
                                        />
                                    )
                                })}
                        </div>

                        <nav>
                            <ul className="pagination justify-content-between">
                                {this.state.lowerLimit === 1 ? (
                                    <button
                                        disabled
                                        className="btn btn-dark"
                                        onClick={this.previousPage}
                                    >
                                        &laquo; Previous Page
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-dark"
                                        onClick={this.previousPage}
                                    >
                                        &laquo; Previous Page
                                    </button>
                                )}

                                {this.state.lowerLimit +
                                    this.state.user.items.length -
                                    1 ===
                                this.state.user.total_count ? (
                                    <button
                                        disabled
                                        className="btn btn-dark"
                                        onClick={this.nextPage}
                                    >
                                        Next Page &raquo;
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-dark"
                                        onClick={this.nextPage}
                                    >
                                        Next Page &raquo;
                                    </button>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row">
                        {[1, 2, 3, 4].map((item) => {
                            return (
                                <div key={item} className="col-6 col-md-3">
                                    <div className="card my-5">
                                        <MyLoader />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}
