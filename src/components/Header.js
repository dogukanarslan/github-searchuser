import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand } from 'reactstrap'
import { CustomLink } from './CustomLink'
import { GitHub } from 'react-feather'

export const Header = () => {
    return (
        <Navbar fixed="top" color="dark" dark>
            <Link
                to="/"
                component={(props) => (
                    <CustomLink component={NavbarBrand} {...props} />
                )}
            >
                <GitHub />
                <span className="ml-2">GitHub</span>
            </Link>
        </Navbar>
    )
}
