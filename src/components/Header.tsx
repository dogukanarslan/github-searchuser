import { GitHub } from 'react-feather';
import Link from 'next/link';

import { SignOutButton } from 'components/SignOutButton';

import { navLinks } from '../constants';

interface HeaderProps {
  authUsername: string;
}

export const Header = (props: HeaderProps) => {
  const { authUsername } = props;

  return (
    <div className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-7 p-4 text-[#3e3e3e]">
        <header className="w-full justify-center text-center">
          <Link href="/">
            <GitHub size={28} />
          </Link>
        </header>
        <nav className="flex justify-center">
          <ul className="flex items-center gap-1">
            {navLinks.map((navLink) => {
              return (
                <li key={navLink.name}>
                  <Link href={navLink.path}>
                    <div className="rounded-sm px-2 py-1 font-medium hover:bg-black/5">
                      {navLink.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex w-full items-center justify-end gap-3 text-right">
          <Link href={`/users/${authUsername}`}>{authUsername}</Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};
