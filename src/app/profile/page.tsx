import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { UserDetail } from 'app/profile/UserDetail';
import { octokit } from 'lib/api';
import { Suspense } from 'react';

const getAuthenticatedUser = async () => {
  const response = await octokit.rest.users.getAuthenticated();

  return response.data;
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

const Details = async () => {
  const data = await getAuthenticatedUser();
  const {
    data: followers,
    headers: { link: followersLink },
  } = await getFollowers(data.login);
  const {
    data: following,
    headers: { link: followingLink },
  } = await getFollowing(data.login);
  const {
    data: starred,
    headers: { link: starredLink },
  } = await getStarred(data.login);

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation user={data} />
      <Suspense>
        <UserDetail
          user={data}
          followers={followers}
          followersLink={followersLink}
          following={following}
          followingLink={followingLink}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          starred={starred}
          starredLink={starredLink}
        />
      </Suspense>
    </>
  );
};

export default Details;
