import { useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { navLinks } from '../constants';
import { CustomLink } from './CustomLink';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Nav vertical>
      {navLinks.map((link) => (
        <NavItem key={link.name}>
          <CustomLink to={link.path} active={location.pathname === link.path}>
            {link.icon}
            <span className="ml-2">{link.name}</span>
          </CustomLink>
        </NavItem>
      ))}
    </Nav>
  );
};
