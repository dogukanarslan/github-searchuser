import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../constants';
import { GitHub } from 'react-feather';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="p-2">
      <Link to="/" className="flex justify-center items-center mt-3">
        <GitHub size={30} /> <span>GitHub Search</span>
      </Link>

      <hr className="my-2" />

      <ul className="space-y-1">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`${
                location.pathname === link.path ? 'bg-gray-200' : ''
              } flex items-center rounded-lg text-sm hover:bg-gray-200 px-2 py-2 hover:text-gray-700`}
            >
              {link.icon} <span className="ml-2">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
