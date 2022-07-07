import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="Footer bg-dark">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md">
                        <p className="lead text-muted">Github Search</p>
                        <h1 className="small text-muted">&copy; 2019</h1>
                    </div>
                    <div className="col-6 col-md">
                        <h5 className="text-muted">Features</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link className="text-muted" to="/">
                                    Cool stuff
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Random feature
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Team feature
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Stuff for developers
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Another one
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Last time
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5 className="text-muted">Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link className="text-muted" to="/">
                                    Resource
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Resource name
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Another resource
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Final resource
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5 className="text-muted">Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link className="text-muted" to="/">
                                    Business
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Education
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Government
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Gaming
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5 className="text-muted">About</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link className="text-muted" to="/">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Locations
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" to="/">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
