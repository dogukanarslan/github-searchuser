'use client';

import { signOut } from 'next-auth/react';

import { Button } from 'components/Button';

export const SignOutButton = () => {
  return (
    <Button
      color="primary"
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className="text-sm"
    >
      Sign out
    </Button>
  );
};
