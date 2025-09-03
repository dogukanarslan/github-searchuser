import { Users } from 'components';

import { octokit } from 'lib/api';

import { Filters } from 'app/Filters';
import PaginationButtons from 'app/PaginationButtons';

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
      <Users users={data} link={link} />
      <PaginationButtons />
    </>
  );
};

export default HomePage;
