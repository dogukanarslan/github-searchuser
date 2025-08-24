import { GitHub } from 'react-feather';
import { Link } from 'react-router';

import { navLinks } from '../constants';

export const Header = () => {
  return (
    <div className="flex justify-between bg-[#1a1a1a] px-2 py-3 text-white">
      <header className="flex justify-center text-center">
        <Link to="/">
          <GitHub size={36} />
        </Link>
      </header>
      <nav className="flex">
        <ul className="flex items-center gap-2">
          {navLinks.map((navLink) => {
            return (
              <li key={navLink.name} className="hover:underline">
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
