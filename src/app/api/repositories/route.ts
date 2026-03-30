import { getServerOctokit } from 'lib/server-octokit';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since');
  const octokit = await getServerOctokit();

  const repositories = await octokit.rest.repos.listPublic({
    ...(since && { since: parseInt(since) }),
  });

  return Response.json({
    data: repositories.data,
    link: repositories.headers.link,
  });
};
