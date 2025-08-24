import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'components/Button';
import { Users } from '../../components';
import { Spinner } from 'components/Spinner';
import { Filters } from './Filters';
import { fetchUsers, resetUsers } from '../../store/slices/usersSlice';
import { RootState, useAppDispatch } from '../../store/store';
import { Outlet } from 'react-router';

const Home = () => {
  const [resultsPerPage, setResultsPerPage] = useState('30');

  const { data, status } = useSelector((state: RootState) => state.users);
  const { links } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    const urlParams = new URL(links.next).searchParams;
    const since = urlParams.get('since');

    if (since) {
      dispatch(fetchUsers({ startingId: since, resultsPerPage }));
    }
  };

  const changeResultsPerPage = (count: string) => {
    setResultsPerPage(count);
  };

  useEffect(() => {
    dispatch(fetchUsers({}));
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);

  if (status === 'error') {
    return 'There was an error';
  }

  return (
    <>
      <Filters
        resultsPerPage={resultsPerPage}
        changeResultsPerPage={changeResultsPerPage}
      />
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
            onClick={loadMore}
            disabled={!links?.next}
          >
            Load More
          </Button>
        )}
      </div>
      <Outlet />
    </>
  );
};
export default Home;
