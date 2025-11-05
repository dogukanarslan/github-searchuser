import { octokit } from 'lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resultsPerPage = searchParams.get('resultsPerPage');
  const startingId = searchParams.get('startingId');

  const users = await octokit.rest.users.list({
    since: startingId ? parseInt(startingId) : undefined,
    ...(resultsPerPage && { per_page: parseInt(resultsPerPage) }),
  });

  return Response.json({ data: users.data, link: users.headers.link });
}
