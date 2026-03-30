'use client';

import { signIn } from 'next-auth/react';

import { Button } from 'components/Button';

const SignInButton = () => {
  return (
    <Button
      onClick={() => signIn('github', { callbackUrl: '/' })}
      className="w-full"
    >
      Continue with GitHub
    </Button>
  );
};

export default SignInButton;
