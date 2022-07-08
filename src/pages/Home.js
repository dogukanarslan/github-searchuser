import React, { useEffect, useState } from 'react'
import { getUsers } from '../constants'
import { Users, Filters } from '../components'

export const Home = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers(null)
    }, [])

    const fetchUsers = (startingId, resultsPerPage) => {
        getUsers(startingId, resultsPerPage).then((res) => setUsers(res))
    }

    return (
        <>
            <Filters fetchUsers={fetchUsers} />
            <Users users={users} />
        </>
    )
}
