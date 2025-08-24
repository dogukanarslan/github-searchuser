import { createHashRouter, redirect, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from 'store/store';
import { App } from 'App';

import Details from 'app/details/page';
import Home from 'app/home/page';
import Repositories from 'app/repositories/page';
import Search from 'app/search/page';

import './index.css';

const container = document.getElementById('root') as HTMLDivElement;

const router = createHashRouter([
  {
    path: '/',
    Component: App,
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

createRoot(container).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
