import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { UserDetail } from 'app/profile/UserDetail';
import { octokit } from 'lib/api';

const getUserDetail = (username: string) => {
  return octokit.rest.users.getByUsername({
    username,
  });
};

const getFollowers = (username: string) => {
  return octokit.rest.users.listFollowersForUser({
    username,
  });
};

const getFollowing = (username: string) => {
  return octokit.rest.users.listFollowingForUser({
    username,
  });
};

const getStarred = (username: string) => {
  return octokit.rest.activity.listReposStarredByUser({
    username,
  });
};

const checkIsFollowedByAuthenticated = async (username: string) => {
  try {
    await octokit.rest.users.checkPersonIsFollowedByAuthenticated({ username });
    return true
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
      />
    </>
  );
};

export default Details;
