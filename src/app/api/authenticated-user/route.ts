import { NextResponse } from 'next/server';

import {
  getRequiredServerOctokit,
  UnauthorizedError,
} from 'lib/server-octokit';

export const GET = async () => {
  try {
    const octokit = await getRequiredServerOctokit();
    const response = await octokit.rest.users.getAuthenticated();

    return NextResponse.json({ data: response.data });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    throw error;
  }
};
