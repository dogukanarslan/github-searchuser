'use client';

import { Button } from 'components/Button';
import { SkipBack, SkipForward } from 'react-feather';
import { useState } from 'react';

interface Props {
  searchKeyword: string;
  link: any;
  getData: (searchKeyword: string, page?: number) => void;
}

const PaginationButtons = (props: Props) => {
  const { searchKeyword, link, getData } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = (type: 'prev' | 'next') => {
    const urlParams = new URL(link[type]).searchParams;
    const page = urlParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page));
      getData(searchKeyword, parseInt(page));
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
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
