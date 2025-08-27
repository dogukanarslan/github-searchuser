import { createHashRouter, redirect, RouterProvider } from 'react-router';

import Details from 'app/details/page';
import Home from 'app/home/page';
import Repositories from 'app/repositories/page';
import Search from 'app/search/page';
import { Layout } from 'Layout';

const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        loader: () => {
          return redirect('/users');
        },
      },
      { path: '/profile', Component: Details },
      {
        path: '/users',
        children: [
          { index: true, Component: Home },
          {
            path: ':login',
            Component: Details,
          },
        ],
      },
      { path: '/search', Component: Search },
      { path: '/repositories', Component: Repositories },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
