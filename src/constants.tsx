import { Users, Book, User } from 'react-feather';

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

export const navLinks = (authUsername: string) => [
  { name: 'Profile', path: `/users/${authUsername}`, icon: <User size={16} /> },
  { name: 'Users', path: '/', icon: <Users size={16} /> },
  { name: 'Repositories', path: '/repositories', icon: <Book size={16} /> },
];
