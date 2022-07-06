import React from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../constants'

export default class Header extends React.Component {
    constructor() {
        super()
        this.state = { navbarClass: 'navbar-nav' }
        this.collapseNavbar = this.collapseNavbar.bind(this)
    }

    collapseNavbar() {
        if (this.state.navbarClass === 'navbar-nav') {
            this.setState({ navbarClass: 'navbar-nav responsive' })
        } else {
            this.setState({ navbarClass: 'navbar-nav' })
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="button-container">
                    <Link className="navbar-brand" to="/">
                        <i className="fab fa-github fa-2x"></i>
                    </Link>
                    <i
                        onClick={() => this.collapseNavbar()}
                        className="fas fa-bars switchButton"
                    ></i>
                </div>
                <ul className={this.state.navbarClass}>
                    {navLinks.map((link) => {
                        return (
                            <li
                                key={link.name}
                                className="nav-item"
                                onClick={() =>
                                    this.setState({ navbarClass: 'navbar-nav' })
                                }
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
}
