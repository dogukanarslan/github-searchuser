import { redirect } from 'next/navigation';
import Link from 'next/link';

import { getServerAuthSession } from 'lib/auth';

import SignInButton from './SignInButton';

const SignInPage = async () => {
  const session = await getServerAuthSession();

  if (session?.accessToken) {
    redirect('/');
  }

  return (
    <div className="flex h-screen overflow-hidden items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-3 rounded-xl border p-8">
        <SignInButton />
        <Link
          href="/"
          className="bg-primary hover:bg-primary-light inline-block w-full rounded-md px-3 py-1.5 text-center text-white"
        >
          Continue as guest
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
