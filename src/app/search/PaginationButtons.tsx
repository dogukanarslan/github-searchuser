'use client';

import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { fetchSearch } from 'store/slices/searchSlice';
import { SkipBack, SkipForward } from 'react-feather';
import { useState } from 'react';

interface Props {
  searchKeyword: string;
}

const PaginationButtons = (props: Props) => {
  const { searchKeyword } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const { link } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const loadMore = (type: 'prev' | 'next') => {
    const urlParams = new URL(link[type]).searchParams;
    const page = urlParams.get('page');

    if (page) {
      setCurrentPage(parseInt(page));
      dispatch(
        fetchSearch({
          q: searchKeyword,
          ...(page && { page: parseInt(page) }),
        })
      );
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      <Button
        color="primary"
        className="my-5"
        onClick={() => loadMore('prev')}
        disabled={!link?.prev}
      >
        <SkipBack />
      </Button>
      <div>{currentPage}</div>
      <Button
        color="primary"
        className="my-5"
        onClick={() => loadMore('next')}
        disabled={!link?.next}
      >
        <SkipForward />
      </Button>
    </div>
  );
};

export default PaginationButtons;
