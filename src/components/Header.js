import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse,
} from 'reactstrap'
import { navLinks } from '../constants'
import { CustomLink } from './CustomLink'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Navbar color="dark" dark expand="md">
            <Link
                to="/"
                component={(props) => (
                    <CustomLink component={NavbarBrand} {...props} />
                )}
            >
                <i className="fab fa-github fa-2x"></i>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse navbar isOpen={isOpen}>
                <Nav className="ml-auto" navbar>
                    {navLinks.map((link) => {
                        return (
                            <NavItem key={link.name}>
                                <Link
                                    to={link.path}
                                    component={(props) => (
                                        <CustomLink
                                            component={NavLink}
                                            {...props}
                                        />
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </NavItem>
                        )
                    })}
                </Nav>
            </Collapse>
        </Navbar>
    )
}
