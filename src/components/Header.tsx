import { GitHub } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { navLinks } from '../constants';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="border-b px-24 py-4">
      <nav className="mx-auto flex items-center font-semibold">
        <GitHub size={36} className="mr-10" />

        <ul className="flex items-center gap-x-5">
          {navLinks.map((navLink) => {
            return (
              <li
                key={navLink.name}
                className={clsx('hover:text-indigo-600', {
                  'text-indigo-600': pathname === navLink.path,
                })}
              >
                <Link to={navLink.path}>{navLink.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
