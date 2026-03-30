import { redirect } from 'next/navigation';

import { getServerAuthSession } from 'lib/auth';

import SignInButton from './SignInButton';

const SignInPage = async () => {
  const session = await getServerAuthSession();

  if (session?.accessToken) {
    redirect('/');
  }

  return (
    <div className="flex h-screen overflow-hidden items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border p-8">
        <SignInButton />
      </div>
    </div>
  );
};

export default SignInPage;
