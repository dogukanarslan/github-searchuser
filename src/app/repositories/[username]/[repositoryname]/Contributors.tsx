import { Endpoints } from '@octokit/types';

import { User } from 'components/User';

interface Props {
  contributors: Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'];
}

export const Contributors = (props: Props) => {
  const { contributors } = props;

  return (
    <div>
      <h1 className="font-bold">Contributors</h1>
      <div className="space-y-2">
        {contributors.map((contributor) => (
          <User
            key={contributor.id}
            login={contributor.login || ''}
            avatar_url={contributor.avatar_url || ''}
          />
        ))}
      </div>
    </div>
  );
};
