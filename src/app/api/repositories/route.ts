import { octokit } from 'lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since');

  const repositories = await octokit.rest.repos.listPublic({
    ...(since && { since: parseInt(since) }),
  });

  return Response.json({
    data: repositories.data,
    link: repositories.headers.link,
  });
}
