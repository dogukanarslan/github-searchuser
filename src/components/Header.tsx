import { GitHub } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '../constants';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="border-b px-24 py-5">
      <nav className="mx-auto flex items-center font-semibold">
        <GitHub size={48} className="mr-10" />

        <ul className="flex h-16 items-center gap-10">
          {navLinks.map((navLink) => {
            return (
              <li
                key={navLink.name}
                className={`border-indigo-600 hover:border-b-2${
                  pathname === navLink.path ? ' border-b-2' : ''
                }`}
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
