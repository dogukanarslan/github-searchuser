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

const Details = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const { data: user } = await getUserDetail(username);
  const { data: followers } = await getFollowers(username);

  if (!user) {
    return;
  }

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation user={user} />
      <UserDetail user={user} followers={followers} />
    </>
  );
};

export default Details;
