import { Filters } from './Filters'
import { Users } from '../../components/Users'
import { useSelector } from 'react-redux'

export const Search = () => {
    const { data, status } = useSelector((state) => state.search)

    return (
        <>
            <Filters />
            <Users
                users={data?.items}
                count={data?.total_count}
                status={status}
            />
        </>
    )
}
