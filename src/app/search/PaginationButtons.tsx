'use client';

import { Button } from 'components/Button';
import { SkipBack, SkipForward } from 'react-feather';

interface Props {
  searchKeyword: string;
  link?: Record<string, string>;
  currentPage: number;
  getData: (searchKeyword: string, page?: number) => void;
}

const PaginationButtons = (props: Props) => {
  const { searchKeyword, link, currentPage, getData } = props;

  const loadMore = (type: 'prev' | 'next') => {
    if (link) {
      const urlParams = new URL(link[type]).searchParams;
      const page = urlParams.get('page');
      if (page) {
        getData(searchKeyword, parseInt(page));
      }
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
