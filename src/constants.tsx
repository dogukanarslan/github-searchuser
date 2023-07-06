import { get } from '../src/request';
import { Users, Search } from 'react-feather';
import { ISearch, IUser } from 'models';

export const getUsers = (startingId: string, resultsPerPage: string) => {
  const searchParams = new URLSearchParams();

  if (startingId) {
    searchParams.append('since', startingId);
  }

  if (resultsPerPage) {
    searchParams.append('per_page', resultsPerPage);
  }

  return get<IUser[]>('/users', searchParams.toString());
};

export const getUser = (login: string) => {
  return get<IUser>(`/users/${login}`);
};

export const getSearch = (type: string, q: string) => {
  return get<ISearch>(`/search/${type}?q=${q}`);
};

export const getFollowers = (login: string) => {
  return get<IUser[]>(`/users/${login}/followers`);
};

export const navLinks = [
  { name: 'Users', path: '/', icon: <Users size={16} /> },
  { name: 'Search', path: '/search', icon: <Search size={16} /> },
];

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
};
