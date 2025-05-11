import { Users, Search, Book, User } from 'react-feather';

export const parseLinkHeader = (header: string) => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  const parts = header.split(',');
  const links: Record<string, string> = {};

  parts.forEach((part: string) => {
    const section = part.split(';');
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
  { name: 'Profile', path: '/profile', icon: <User size={16} /> },
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
