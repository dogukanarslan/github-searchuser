import { useEffect } from 'react'
import { Users } from '../../components'
import { Filters } from './Filters'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../features/users/usersSlice'

export const Home = () => {
    const users = useSelector((state) => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <>
            <Filters />
            <Users users={users} />
        </>
    )
}
