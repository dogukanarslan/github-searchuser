import StoreProvider from './StoreProvider';

import { octokit } from 'lib/api';
import { redirect } from 'next/navigation';

import { Header } from 'components/Header';

import '../index.css';

export const metadata = {
  title: 'GitHub Search',
};

const getAuthenticatedUser = async () => {
  const response = await octokit.rest.users.getAuthenticated();
  return response.data;
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!githubToken) {
    return (
      <html lang="en">
        <body>
          <div className="mx-auto mt-2 max-w-6xl p-4">{children}</div>
        </body>
      </html>
    );
  }

  let authenticatedUser;

  try {
    authenticatedUser = await getAuthenticatedUser();
  } catch {
    redirect('/signin');
  }

  return (
    <html lang="en">
      <body>
        <StoreProvider authenticatedUser={authenticatedUser}>
          <Header authUsername={authenticatedUser.login} />
          <div className="mx-auto mt-2 max-w-6xl p-4">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
