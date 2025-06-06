import { Header } from 'components';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  );
};
