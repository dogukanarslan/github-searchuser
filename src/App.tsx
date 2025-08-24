import { Header } from 'components';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <div className="mx-auto">
      <Header />
      <div className="mt-2 p-8">
        <Outlet />
      </div>
    </div>
  );
};
