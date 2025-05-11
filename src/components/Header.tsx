import { GitHub } from 'react-feather';
import { Link } from 'react-router-dom';

import { navLinks } from '../constants';

export const Header = () => {
  return (
    <div className="flex justify-between border-b border-neutral-200">
      <header className="flex justify-center border-b py-4 text-center">
        <Link to="/">
          <GitHub size={36} />
        </Link>
      </header>
      <nav className="flex py-2">
        <ul className="flex items-center gap-2">
          {navLinks.map((navLink) => {
            return (
              <li key={navLink.name} className="text-gray-800 hover:underline">
                <Link to={navLink.path}>
                  <div className="flex items-center gap-2">
                    {navLink.icon} {navLink.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
