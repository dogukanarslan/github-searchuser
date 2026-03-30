import { NextResponse } from 'next/server';

import {
  getRequiredServerOctokit,
  UnauthorizedError,
} from 'lib/server-octokit';

type Context = {
  params: Promise<{ username: string; repositoryname: string }>;
};

export const PUT = async (_request: Request, context: Context) => {
  try {
    const { username, repositoryname } = await context.params;
    const octokit = await getRequiredServerOctokit();

    await octokit.rest.activity.starRepoForAuthenticatedUser({
      owner: username,
      repo: repositoryname,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    throw error;
  }
};

export const DELETE = async (_request: Request, context: Context) => {
  try {
    const { username, repositoryname } = await context.params;
    const octokit = await getRequiredServerOctokit();

    await octokit.rest.activity.unstarRepoForAuthenticatedUser({
      owner: username,
      repo: repositoryname,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    throw error;
  }
};
