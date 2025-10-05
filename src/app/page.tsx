import { octokit } from 'lib/api';

import { Filters } from 'app/Filters';
import PaginationButtons from 'app/PaginationButtons';

import UsersWrapper from 'app/UsersWrapper';

const getUsers = async (username?: string) => {
  if (username) {
    const response = await octokit.rest.search.users({ q: username });

    return { data: response.data.items, link: response.headers.link };
  } else {
    const response = await octokit.rest.users.list({});

    return { data: response.data, link: response.headers.link };
  }
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const username = (await searchParams).username;
  const { data, link } = await getUsers(username);

  return (
    <>
      <Filters />
      <UsersWrapper users={data} link={link} />
      <PaginationButtons />
    </>
  );
};

export default HomePage;
