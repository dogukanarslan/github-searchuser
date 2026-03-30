import { NextResponse } from 'next/server';

import {
  getRequiredServerOctokit,
  UnauthorizedError,
} from 'lib/server-octokit';

type Context = {
  params: Promise<{ username: string }>;
};

export const GET = async (_request: Request, context: Context) => {
  try {
    const { username } = await context.params;
    const octokit = await getRequiredServerOctokit();

    await octokit.rest.users.checkPersonIsFollowedByAuthenticated({
      username,
    });

    return NextResponse.json({ isFollowed: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ isFollowed: false });
  }
};

export const PUT = async (_request: Request, context: Context) => {
  try {
    const { username } = await context.params;
    const octokit = await getRequiredServerOctokit();

    await octokit.rest.users.follow({ username });

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
    const { username } = await context.params;
    const octokit = await getRequiredServerOctokit();

    await octokit.rest.users.unfollow({ username });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    throw error;
  }
};
