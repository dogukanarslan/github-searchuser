import StoreProvider from './StoreProvider';

import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

import { getServerAuthSession } from 'lib/auth';
import { createOctokit } from 'lib/api';

import { Header } from 'components/Header';

import '../index.css';

export const metadata = {
  title: 'GitHub Search',
};

const inter = Inter({
  subsets: ['latin'],
});

const getAuthenticatedUser = async () => {
  const session = await getServerAuthSession();

  if (!session?.accessToken) {
    redirect('/signin');
  }

  const octokit = createOctokit(session.accessToken);
  const response = await octokit.rest.users.getAuthenticated();
  return response.data;
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = (await headers()).get('x-pathname') ?? '';

  if (pathname.startsWith('/signin')) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );
  }

  const authenticatedUser = await getAuthenticatedUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider authenticatedUser={authenticatedUser}>
          <Header />
          <div className="mx-auto max-w-6xl p-4">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
