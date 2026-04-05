import { Endpoints } from '@octokit/types';
import { Repositories } from 'components/Repositories';

interface Props {
  repositories?: Endpoints['GET /search/repositories']['response']['data']['items'];
  totalCount?: Endpoints['GET /search/repositories']['response']['data']['total_count'];
}

const SearchResults = (props: Props) => {
  const { repositories, totalCount } = props;

  return (
    <div>
      <h1>Total Count: {totalCount}</h1>
      <Repositories repositories={repositories} />
    </div>
  );
};

export default SearchResults;
