import { GitHub } from 'react-feather';
import { Link } from 'react-router-dom';

import { navLinks } from '../constants';

export const Header = () => {
  return (
    <div>
      <header className="flex justify-center border-b border-neutral-200 py-4 text-center">
        <GitHub size={36} />
      </header>
      <nav className="flex py-2">
        <ul className="flex items-center gap-x-3">
          {navLinks.map((navLink) => {
            return (
              <li key={navLink.name} className="text-gray-800 hover:underline">
                <Link to={navLink.path}>{navLink.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
