import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
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

  return (
    <div className="p-3">
      <Link
        to="/"
        className="link-body-emphasis text-decoration-none d-flex align-items-center"
      >
        <GitHub size={40} /> GitHub Search
      </Link>
      <hr />
      <Nav pills vertical>
        {navLinks.map((link) => (
          <NavItem key={link.name}>
            <Link
              className={`${
                location.pathname === link.path
                  ? 'nav-link active'
                  : 'nav-link link-body-emphasis '
              }`}
              to={link.path}
            >
              {link.icon}
              <span className="ms-2"> {link.name}</span>
            </Link>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
};
