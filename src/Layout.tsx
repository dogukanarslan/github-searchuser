import { Outlet } from 'react-router';

import { Header } from 'components';

export const Layout = () => {
  return (
    <div className="mx-auto">
      <Header />
      <div className="mt-2 p-4">
        <Outlet />
      </div>
    </div>
  );
};
