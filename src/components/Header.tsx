import { GitHub } from 'react-feather';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="px-24">
      <GitHub className="mx-auto mt-5" size={48} />
      <nav className="flex items-center justify-center border-b uppercase">
        <ul className="flex h-16 items-center">
          <li className="mr-5 hover:border-b">
            <Link to="/">Users</Link>
          </li>
          <li className="hover:border-b">
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
