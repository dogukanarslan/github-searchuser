import './index.css';
import { createHashRouter, redirect, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { Details, Home, Repositories, Search } from 'pages';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { App } from 'App';

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
