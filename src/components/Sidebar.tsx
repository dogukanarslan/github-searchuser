import { Link, useLocation } from 'react-router-dom';
import { Rewind, FastForward } from 'react-feather';
import { Button } from './Button';
import { navLinks } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { isOpen, setIsOpen } = props;

  const location = useLocation();

  return (
    <div
      className={`fixed top-0 h-full transition-[width] duration-500 overflow-x-hidden${
        isOpen ? ' w-[200px]' : ' w-16'
      } bg-gray-100 shadow-md`}
    >
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Rewind size={16} /> : <FastForward size={16} />}
      </Button>
      <div className="p-2">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path ? 'bg-gray-200' : ''
                } flex items-center rounded-lg px-2 py-2 text-sm hover:bg-gray-200 hover:text-gray-700`}
              >
                {link.icon} <span className="ml-2">{isOpen && link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
