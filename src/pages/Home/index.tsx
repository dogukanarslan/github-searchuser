import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'components/Button';
import { Users } from '../../components';
import { Spinner } from 'components/Spinner';
import { Filters } from './Filters';
import { fetchUsers, resetUsers } from '../../features/users/usersSlice';
import { RootState, useAppDispatch } from '../../app/store';

export const Home = () => {
  const { data, status } = useSelector((state: RootState) => state.users);

  const { links } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    const urlParams = new URL(links.next).searchParams;
    const since = urlParams.get('since');

    if (since) {
      dispatch(fetchUsers({ startingId: since, resultsPerPage: '30' }));
    }
  };

  useEffect(() => {
    dispatch(resetUsers());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Filters />
      <Users users={data} count={data?.length} />
      <div className="text-center">
        {status === 'loading' ? (
          <div className="my-5">
            <Spinner />
          </div>
        ) : (
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore()}
            disabled={!links?.next}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};
