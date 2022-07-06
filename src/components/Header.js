import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../constants'

export const Header = () => {
    const [navbarClass, setNavbarClass] = useState('navbar-nav')

    const collapseNavbar = () => {
        if (navbarClass === 'navbar-nav') {
            setNavbarClass('navbar-nav responsive')
        } else {
            setNavbarClass('navbar-nav')
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="button-container">
                <Link className="navbar-brand" to="/">
                    <i className="fab fa-github fa-2x"></i>
                </Link>
                <i
                    onClick={() => collapseNavbar()}
                    className="fas fa-bars switchButton"
                ></i>
            </div>
            <ul className={navbarClass}>
                {navLinks.map((link) => {
                    return (
                        <li
                            key={link.name}
                            className="nav-item"
                            onClick={() => setNavbarClass('navbar-nav')}
                        >
                            <Link className="nav-link" to={link.path}>
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
