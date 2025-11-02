'use client';

import { useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from 'store/store';
import { fetchUsers, searchUsers } from 'store/slices/usersSlice';

import SearchResults from 'app/SearchResults';

import { Users } from 'components/Users';
import PaginationButtons from 'components/PaginationButtons';

interface Props {
  totalCount?: number;
}

const UsersWrapper = (props: Props) => {
  const { totalCount } = props;

  const searchParams = useSearchParams();
  const username = searchParams.get('q');

  const {
    searchResults,
    data,
    status,
    link: usersLink,
  } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (usersLink) {
      if (username) {
        const urlParams = new URL(usersLink?.next).searchParams;
        const page = urlParams.get('page');

        if (page) {
          dispatch(searchUsers({ username, page: parseInt(page) }));
        }
      } else {
        const urlParams = new URL(usersLink.next).searchParams;
        const since = urlParams.get('since');

        if (since) {
          dispatch(
            fetchUsers({
              ...(since && { startingId: parseInt(since) }),
            })
          );
        }
      }
    }
  };

  return (
    <div>
      {username ? (
        <SearchResults users={searchResults} totalCount={totalCount} />
      ) : (
        <Users users={data} />
      )}
      <PaginationButtons
        loadMore={loadMore}
        isLoading={status === 'loading'}
        hasMore={!usersLink?.next}
      />
    </div>
  );
};

export default UsersWrapper;
