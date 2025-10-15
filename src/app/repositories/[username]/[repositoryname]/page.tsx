import Image from 'next/image';
import { format } from 'date-fns';

import { octokit } from 'lib/api';

import StarButton from 'app/repositories/[username]/[repositoryname]/StarButton';
import { Branches } from 'app/repositories/[username]/[repositoryname]/Branches';
import { Languages } from 'app/repositories/[username]/[repositoryname]/Languages';
import { Contributors } from 'app/repositories/[username]/[repositoryname]/Contributors';

import { Badge } from 'components/Badge';
import { Card } from 'components/Card';

const getRepository = async (username: string, repositoryName: string) => {
  const response = await octokit.rest.repos.get({
    owner: username,
    repo: repositoryName,
  });

  return { data: response.data };
};

const getLanguages = async (username: string, repositoryName: string) => {
  const response = await octokit.rest.repos.listLanguages({
    owner: username,
    repo: repositoryName,
  });

  return { data: response.data };
};

const getBranches = async (username: string, repositoryName: string) => {
  const response = await octokit.rest.repos.listBranches({
    owner: username,
    repo: repositoryName,
  });

  return { data: response.data };
};

const getContributors = async (username: string, repositoryName: string) => {
  const response = await octokit.rest.repos.listContributors({
    owner: username,
    repo: repositoryName,
  });

  return { data: response.data };
};

const isStarredByAuthenticated = async (
  username: string,
  repositoryName: string
) => {
  try {
    await octokit.rest.activity.checkRepoIsStarredByAuthenticatedUser({
      owner: username,
      repo: repositoryName,
    });
    return true;
  } catch {
    return false;
  }
};

const RepositoryDetailPage = async ({
  params,
}: {
  params: Promise<{ username: string; repositoryname: string }>;
}) => {
  const username = (await params).username;
  const repositoryname = (await params).repositoryname;

  const repositoryDetail = await getRepository(username, repositoryname);
  const languages = await getLanguages(username, repositoryname);
  const isStarred = await isStarredByAuthenticated(username, repositoryname);
  const branches = await getBranches(username, repositoryname);
  const contributors = await getContributors(username, repositoryname);

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={repositoryDetail.data.owner.avatar_url}
            alt="Owner image"
            width={50}
            height={50}
          />
          <h1 className="font-bold">{repositoryDetail.data.name}</h1>
          {repositoryDetail.data.visibility && (
            <Badge>{repositoryDetail.data.visibility}</Badge>
          )}
        </div>
        <StarButton
          isStarred={isStarred}
          languages={languages.data}
          repository={repositoryDetail.data}
        />
      </div>
      <Card
        body={
          <>
            <div>
              <b>Created at:</b>{' '}
              {format(repositoryDetail.data.created_at, 'dd LLL yyyy')}
            </div>
            <div>
              <b>Description:</b> {repositoryDetail.data.description || '-'}
            </div>
          </>
        }
      />
      <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
        <Contributors contributors={contributors.data} />
        <div className="flex flex-col gap-2">
          <Branches branches={branches.data} />
          <Languages languages={languages.data} />
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetailPage;
