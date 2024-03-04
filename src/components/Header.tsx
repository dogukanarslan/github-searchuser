import { GitHub } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { navLinks } from '../constants';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="fixed w-full bg-primary px-24 py-4 text-white">
      <nav className="mx-auto flex items-center font-semibold">
        <GitHub size={24} className="mr-3" />

        <ul className="flex items-center gap-x-3">
          {navLinks.map((navLink) => {
            return (
              <li
                key={navLink.name}
                className={clsx('hover:text-secondary', {
                  'text-secondary': pathname === navLink.path,
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
