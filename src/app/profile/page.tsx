import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { UserDetail } from 'app/profile/UserDetail';
import { octokit } from 'lib/api';
import { Suspense } from 'react';

const getAuthenticatedUser = async () => {
  const response = await octokit.rest.users.getAuthenticated();

  return response.data;
};

const Details = async () => {
  const data = await getAuthenticatedUser();

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation user={data} />
      <Suspense>
        <UserDetail user={data} />
      </Suspense>
    </>
  );
};

export default Details;
