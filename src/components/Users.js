import React, { useEffect, useState } from 'react'
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

export const Users = () => {
    const [user, setUser] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [location, setLocation] = useState('')
    const [language, setLanguage] = useState('')
    const [sort, setSort] = useState('followers')
    const [itemsPerPage, setItemsPerPage] = useState(40)
    const [pageNumber, setPageNumber] = useState(1)
    const [lowerLimit, setLowerLimit] = useState(1)

    useEffect(() => {
        getUsers(inputVal, location, language, sort, 1, itemsPerPage)
            .then((res) => res.json())
            .then((res) => setUser(res))
    }, [])

    useEffect(() => {
        getUsers(inputVal, location, language, sort, pageNumber, itemsPerPage)
            .then((res) => res.json())
            .then((res) => setUser(res))
    }, [pageNumber, location, language, sort])

    const inputHandlerChange = (event) => {
        setInputVal(event.target.value)
    }

    const selectChange = (event) => {
        switch (event.target.id) {
            case 'location':
                setLocation(
                    event.target.options[event.target.options.selectedIndex]
                        .value
                )
                break
            case 'language':
                setLanguage(
                    event.target.options[event.target.options.selectedIndex]
                        .value
                )
                break
            case 'sort':
                setSort(
                    event.target.options[event.target.options.selectedIndex]
                        .value
                )
        }
    }

    const inputHandlerSubmit = (event) => {
        event.preventDefault()
        getUsers(inputVal, location, language, sort, 1, itemsPerPage)
            .then((res) => res.json())
            .then((res) => {
                setUser(res)
                setLowerLimit(1)
            })
    }

    const nextPage = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setPageNumber(pageNumber + 1)
        setLowerLimit(itemsPerPage + lowerLimit)
    }

    const previousPage = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setPageNumber(pageNumber + 1)
        setLowerLimit(lowerLimit - itemsPerPage)
    }

    if (user.length !== 0 && !user.hasOwnProperty('message')) {
        return (
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form
                                className="my-3"
                                onSubmit={inputHandlerSubmit}
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
                                            value={inputVal}
                                            onChange={inputHandlerChange}
                                        />
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label htmlFor="location">
                                            Location
                                        </label>
                                        <select
                                            className="form-control"
                                            id="location"
                                            onChange={selectChange}
                                        >
                                            {options.locationOptions.map(
                                                (location) => {
                                                    return (
                                                        <Option
                                                            key={location.name}
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
                                            onChange={selectChange}
                                        >
                                            {options.languageOptions.map(
                                                (language) => {
                                                    return (
                                                        <Option
                                                            key={language.name}
                                                            {...language}
                                                        />
                                                    )
                                                }
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label htmlFor="sort">Sort by</label>
                                        <select
                                            className="form-control"
                                            id="sort"
                                            onChange={selectChange}
                                        >
                                            {options.sortOptions.map((sort) => {
                                                return (
                                                    <Option
                                                        key={sort.name}
                                                        {...sort}
                                                    />
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-dark" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                    <p className="lead">
                        {lowerLimit}-{lowerLimit + user.items.length - 1} of{' '}
                        {user.total_count} results
                    </p>

                    <div className="row">
                        {user.items
                            .slice(0, itemsPerPage)
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
                            {lowerLimit === 1 ? (
                                <button
                                    disabled
                                    className="btn btn-dark"
                                    onClick={previousPage}
                                >
                                    &laquo; Previous Page
                                </button>
                            ) : (
                                <button
                                    className="btn btn-dark"
                                    onClick={previousPage}
                                >
                                    &laquo; Previous Page
                                </button>
                            )}

                            {lowerLimit + user.items.length - 1 ===
                            user.total_count ? (
                                <button
                                    disabled
                                    className="btn btn-dark"
                                    onClick={nextPage}
                                >
                                    Next Page &raquo;
                                </button>
                            ) : (
                                <button
                                    className="btn btn-dark"
                                    onClick={nextPage}
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
