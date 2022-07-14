import { Filters } from './Filters'
import { Users } from '../../components/Users'
import { useSelector } from 'react-redux'

export const Search = () => {
    const search = useSelector((state) => state.search)

    return (
        <>
            <Filters />
            <Users users={search} />
        </>
    )
}
