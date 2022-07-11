import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap'
import { CustomLink } from './CustomLink'

export const Header = () => {
    return (
        <Navbar fixed="top" color="dark" dark>
            <Link
                to="/"
                component={(props) => (
                    <CustomLink component={NavbarBrand} {...props} />
                )}
            >
                <i className="fab fa-github fa-2x"></i>
            </Link>
            <NavbarText>GitHub</NavbarText>
        </Navbar>
    )
}
