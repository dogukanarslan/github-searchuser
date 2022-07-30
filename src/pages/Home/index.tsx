import { useEffect } from 'react'
import { Users } from '../../components'
import { Filters } from './Filters'
import { useSelector } from 'react-redux'
import { fetchUsers } from '../../features/users/usersSlice'
import { RootState, useAppDispatch } from '../../app/store'

export const Home = () => {
    const { data, status } = useSelector((state: RootState) => state.users)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data === null) {
            dispatch(fetchUsers())
        }
    }, [data, dispatch])

    return (
        <>
            <Filters />
            <Users users={data} count={data?.length} status={status} />
        </>
    )
}
