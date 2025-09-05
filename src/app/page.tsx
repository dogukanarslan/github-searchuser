import { Users } from 'components';

import { octokit } from 'lib/api';

import { Filters } from 'app/Filters';
import PaginationButtons from 'app/PaginationButtons';

import { HydrateUsers } from 'components/HydrateUsers';

const getUsers = async (perPage?: string) => {
  const response = await octokit.rest.users.list({
    ...(perPage && { per_page: parseInt(perPage) }),
  });

  return { data: response.data, link: response.headers.link };
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const perPage = (await searchParams).per_page;
  const { data, link } = await getUsers(perPage);

  return (
    <>
      <Filters />
      <HydrateUsers users={data} link={link} />
      <Users users={data} />
      <PaginationButtons />
    </>
  );
};

export default HomePage;
