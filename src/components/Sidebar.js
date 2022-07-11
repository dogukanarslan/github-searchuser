import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavLink } from 'reactstrap'
import { navLinks } from '../constants'
import { CustomLink } from './CustomLink'

export const Sidebar = () => {
    const [page, setPage] = useState(navLinks[0].name)

    return (
        <Nav className="sidebar py-5" vertical>
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    component={(props) => (
                        <CustomLink
                            component={NavLink}
                            onClick={() => setPage(link.name)}
                            active={page === link.name}
                            {...props}
                        />
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </Nav>
    )
}
