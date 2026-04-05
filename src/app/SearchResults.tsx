import { Endpoints } from '@octokit/types';
import { Users } from 'components';

interface Props {
  users?: Endpoints['GET /search/users']['response']['data']['items'];
  totalCount?: Endpoints['GET /search/users']['response']['data']['total_count'];
}

const SearchResults = (props: Props) => {
  const { users, totalCount } = props;

  return (
    <div>
      <h1>Total Count: {totalCount}</h1>
      <Users users={users} />
    </div>
  );
};

export default SearchResults;
