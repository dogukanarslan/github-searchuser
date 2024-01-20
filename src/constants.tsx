import { get } from '../src/request';
import { Users, Search, Book } from 'react-feather';
import { ISearch, IUser, IRepository } from 'models';

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

export const getFollowing = (login: string) => {
  return get<IUser[]>(`/users/${login}/following`);
};

export const getRepositories = () => {
  return get<IRepository[]>('/repositories');
};

export const parseLinkHeader = (header: string) => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  const parts = header.split(',');
  const links: Record<string, string> = {};

  parts.forEach((part: string) => {
    var section = part.split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  });

  return links;
};

export const navLinks = [
  { name: 'Users', path: '/', icon: <Users size={16} /> },
  { name: 'Repositories', path: '/repositories', icon: <Book size={16} /> },
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
