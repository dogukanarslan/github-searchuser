import 'server-only';

import { createOctokit } from 'lib/api';
import { getServerAuthSession } from 'lib/auth';

export class UnauthorizedError extends Error {}

export const getServerOctokit = async () => {
  const session = await getServerAuthSession();

  return createOctokit(session?.accessToken);
};

export const getRequiredServerOctokit = async () => {
  const session = await getServerAuthSession();

  if (!session?.accessToken) {
    throw new UnauthorizedError('Unauthorized');
  }

  return createOctokit(session.accessToken);
};
