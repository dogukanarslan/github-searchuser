import { octokit } from 'lib/api';

import { Filters } from 'app/repositories/Filters';
import RepositoriesWrapper from 'app/repositories/RepositoriesWrapper';
import { Initializer } from 'app/repositories/Initializer';

const getRepositories = async () => {
  const data = await octokit.rest.repos.listPublic();
  return { data: data.data, link: data.headers.link };
};

const getSearchResults = async (repositoryName: string) => {
  const response = await octokit.rest.search.repos({ q: repositoryName });

  return {
    data: response.data.items,
    totalCount: response.data.total_count,
    link: response.headers.link,
  };
};

const RepositoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const repositoryName = (await searchParams).q;
  let searchResults, data, link, totalCount;
  if (repositoryName) {
    const response = await getSearchResults(repositoryName);
    searchResults = response.data;
    totalCount = response.totalCount;
    link = response.link;
  } else {
    const response = await getRepositories();
    data = response.data;
    link = response.link;
  }

  return (
    <>
      <Filters />
      <RepositoriesWrapper totalCount={totalCount} />
      <Initializer
        repositories={data}
        searchResults={searchResults}
        link={link}
        totalCount={totalCount}
      />
    </>
  );
};

export default RepositoriesPage;
