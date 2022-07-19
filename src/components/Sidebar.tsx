import { Link, useLocation } from 'react-router-dom'
import { Nav, NavLink } from 'reactstrap'
import { navLinks } from '../constants'
import { CustomLink } from './CustomLink'
export const Sidebar = () => {
    const location = useLocation()

    return (
        <Nav vertical>
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    component={(props) => (
                        <CustomLink
                            component={NavLink}
                            active={location.pathname === link.path}
                            {...props}
                        />
                    )}
                >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                </Link>
            ))}
        </Nav>
    )
}
