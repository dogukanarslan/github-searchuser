import { getServerOctokit } from 'lib/server-octokit';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const resultsPerPage = searchParams.get('resultsPerPage');
  const startingId = searchParams.get('startingId');
  const octokit = await getServerOctokit();

  const users = await octokit.rest.users.list({
    since: startingId ? parseInt(startingId) : undefined,
    ...(resultsPerPage && { per_page: parseInt(resultsPerPage) }),
  });

  return Response.json({ data: users.data, link: users.headers.link });
};
