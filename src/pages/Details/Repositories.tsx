import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Spinner } from 'components';
import { fetchRepositores } from 'features/singleUser/singleUserSlice';
import { Repository } from 'components/Repository';

interface Props {
  status: string;
}

export const Repositories = (props: Props) => {
  const { status } = props;

  const { user, repositories } = useAppSelector((state) => state.singleUser);
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchRepositores({ username: user.login }));
    }
  }, [user, dispatch]);

  if (loading['singleUser/fetchRepositories']) {
    return <Spinner />;
  }

  if (status === 'error') {
    return 'There was an error';
  }

  return (
    <div className="space-y-2">
      {repositories.map((repository) => (
        <Repository
          key={repository.id}
          name={repository.name}
          owner={repository.owner.login}
          description={repository.description || ''}
          full_name={repository.full_name}
        />
      ))}
    </div>
  );
};
