import { UserDetailInformation } from 'app/users/[username]/UserDetailInformation';
import { UserDetailHeader } from 'app/users/[username]/UserDetailHeader';
import { UserDetail } from 'app/users/[username]/UserDetail';
import { getServerOctokit } from 'lib/server-octokit';

const getUserDetail = async (username: string) => {
  const octokit = await getServerOctokit();

  return octokit.rest.users.getByUsername({
    username,
  });
};

const getFollowers = async (username: string) => {
  const octokit = await getServerOctokit();

  return octokit.rest.users.listFollowersForUser({
    username,
  });
};

const getFollowing = async (username: string) => {
  const octokit = await getServerOctokit();

  return octokit.rest.users.listFollowingForUser({
    username,
  });
};

const getStarred = async (username: string) => {
  const octokit = await getServerOctokit();

  return octokit.rest.activity.listReposStarredByUser({
    username,
  });
};

const getRepositories = async (username: string) => {
  const octokit = await getServerOctokit();

  return octokit.rest.repos.listForUser({ username });
};

const checkIsFollowedByAuthenticated = async (username: string) => {
  const octokit = await getServerOctokit();

  try {
    await octokit.rest.users.checkPersonIsFollowedByAuthenticated({ username });
    return true;
  } catch {
    return false;
  }
};

const Details = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const { data: user } = await getUserDetail(username);
  const {
    data: followers,
    headers: { link: followersLink },
  } = await getFollowers(username);
  const {
    data: following,
    headers: { link: followingLink },
  } = await getFollowing(username);
  const {
    data: starred,
    headers: { link: starredLink },
  } = await getStarred(username);
  const {
    data: repositories,
    headers: { link: repositoriesLink },
  } = await getRepositories(username);
  const isFollowedByAuthenticated =
    await checkIsFollowedByAuthenticated(username);

  if (!user) {
    return;
  }

  return (
    <>
      <UserDetailHeader isFollowedByAuthenticated={isFollowedByAuthenticated} />
      <UserDetailInformation user={user} />
      <UserDetail
        user={user}
        followers={followers}
        followersLink={followersLink}
        following={following}
        followingLink={followingLink}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        starred={starred}
        starredLink={starredLink}
        repositories={repositories}
        repositoriesLink={repositoriesLink}
      />
    </>
  );
};

export default Details;
