import React, { useEffect, useState } from 'react'
import User from './User'
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
    const [users, setUsers] = useState([])
    const [startingId, setStartingId] = useState(null)
    const [resultsPerPage, setResultsPerPage] = useState(null)

    useEffect(() => {
        fetchUsers(null)
    }, [])

    const fetchUsers = (startingId, resultsPerPage) => {
        getUsers(startingId, resultsPerPage).then((res) => setUsers(res))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchUsers(startingId, resultsPerPage)
    }

    if (users.length !== 0 && !users.hasOwnProperty('message')) {
        return (
            <div className="Home">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                value={startingId}
                                onChange={(e) => setStartingId(e.target.value)}
                                placeholder="Starting ID"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Fetch
                        </button>
                    </form>

                    <p className="lead">{users.length} results</p>
                    <div className="row">
                        {users.map((item, index) => {
                            return (
                                <User key={item.id} page={'home'} {...item} />
                            )
                        })}
                    </div>
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
