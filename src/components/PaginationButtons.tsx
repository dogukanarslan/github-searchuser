'use client';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';

interface Props {
  hasMore?: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

const PaginationButtons = (props: Props) => {
  const { hasMore, isLoading, loadMore } = props;

  return (
    <div className="text-center">
      {isLoading ? (
        <div className="my-5">
          <Spinner />
        </div>
      ) : (
        <Button
          color="primary"
          className="my-5"
          onClick={loadMore}
          disabled={hasMore}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
