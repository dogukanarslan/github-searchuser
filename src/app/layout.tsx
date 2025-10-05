import StoreProvider from './StoreProvider';

import { octokit } from 'lib/api';

import { Header } from 'components/Header';

import '../index.css';

export const metadata = {
  title: 'GitHub Search',
};

const isFollowedByAuthenticated = async () => {
  const response = await octokit.rest.users.getAuthenticated();
  return response.data;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticatedUser = await isFollowedByAuthenticated();

  return (
    <html lang="en">
      <body>
        <StoreProvider authenticatedUser={authenticatedUser}>
          <Header />
          <div className="mx-auto mt-2 max-w-6xl p-4">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
