import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { navLinks } from '../constants';
import { GitHub } from 'react-feather';

export const Sidebar = () => {
  const location = useLocation();

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
