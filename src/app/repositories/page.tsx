import PaginationButtons from 'app/repositories/PaginationButtons';
import { octokit } from 'lib/api';
import Repositories from 'app/repositories/Repositories';

const getRepositories = async () => {
  const data = await octokit.rest.repos.listPublic();
  return { data: data.data };
};

const RepositoriesPage = async () => {
  const repositories = await getRepositories();

  return (
    <>
      <Repositories repositories={repositories.data} />
      <PaginationButtons />
    </>
  );
};

export default RepositoriesPage;
