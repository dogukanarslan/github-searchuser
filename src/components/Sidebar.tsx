import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../constants';
import { GitHub } from 'react-feather';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { isOpen } = props;

  const location = useLocation();

  return (
    <div className="p-2">
      <Link to="/" className="mt-3 flex items-center justify-center">
        <GitHub size={30} /> {isOpen && <span>GitHub Search</span>}
      </Link>

      <hr className="my-2" />

      <ul className="space-y-1">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`${
                location.pathname === link.path ? 'bg-gray-200' : ''
              } flex items-center rounded-lg px-2 py-2 text-sm hover:bg-gray-200 hover:text-gray-700`}
            >
              {link.icon} <span className="ml-2">{isOpen && link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
