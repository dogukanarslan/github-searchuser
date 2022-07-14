import { get } from '../src/request'
import { Users } from 'react-feather'
import { Search } from 'react-feather'
export const getUsers = (startingId, resultsPerPage) => {
    const searchParams = new URLSearchParams()

    if (startingId) {
        searchParams.append('since', startingId)
    }

    if (resultsPerPage) {
        searchParams.append('per_page', resultsPerPage)
    }

    return get('/users', searchParams.toString())
}

export const getUser = (login) => {
    return get(`/users/${login}`)
}

export const getSearch = (type, q) => {
    return get(`/search/${type}?q=${q}`)
}

export const navLinks = [
    { name: 'Home', path: '/', icon: <Users size={16} /> },
    { name: 'Search', path: '/search', icon: <Search size={16} /> },
]

export const options = {
    locationOptions: [
        { name: 'World', value: '' },
        { name: 'Istanbul', value: 'istanbul' },
        { name: 'Ankara', value: 'ankara' },
        { name: 'İzmir', value: 'izmir' },
    ],
    languageOptions: [
        { name: 'All', value: 'all' },
        { name: 'JavaScript', value: 'javascript' },
        { name: 'Python', value: 'python' },
        { name: 'Java', value: 'java' },
        { name: 'Ruby', value: 'ruby' },
        { name: 'C', value: 'c' },
        { name: 'C#', value: 'csharp' },
        { name: 'Pascal', value: 'pascal' },
        { name: 'Fortran', value: 'fortran' },
    ],
    sortOptions: [
        { name: 'Followers - High to Low', value: 'followers' },
        { name: 'Repositories - High to Low', value: 'repositories' },
    ],
}
