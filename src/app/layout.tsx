import StoreProvider from './StoreProvider';

import { Header } from 'components/Header';

import '../index.css';

export const metadata = {
  title: 'GitHub Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <div className="mt-2 p-4">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
