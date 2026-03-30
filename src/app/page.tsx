import { getServerOctokit } from 'lib/server-octokit';

import { Filters } from 'app/Filters';

import UsersWrapper from 'app/UsersWrapper';
import { Initializer } from './Initializer';

const getUsers = async () => {
  const octokit = await getServerOctokit();
  const response = await octokit.rest.users.list();

  return { data: response.data, link: response.headers.link };
};

const getSearchResults = async (username: string) => {
  const octokit = await getServerOctokit();
  const response = await octokit.rest.search.users({ q: username });

  return {
    data: response.data.items,
    totalCount: response.data.total_count,
    link: response.headers.link,
  };
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const username = (await searchParams).q;
  let searchResults, data, link, totalCount;
  if (username) {
    const response = await getSearchResults(username);
    searchResults = response.data;
    totalCount = response.totalCount;
    link = response.link;
  } else {
    const response = await getUsers();
    data = response.data;
    link = response.link;
  }

  return (
    <>
      <Filters />
      <UsersWrapper totalCount={totalCount} />
      <Initializer
        users={data}
        searchResults={searchResults}
        link={link}
        searchResultsLink={link}
      />
    </>
  );
};

export default HomePage;
