import React from 'react';
import { Search } from 'react-feather';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>Page is not found</span>
      <Search />
    </div>
  );
};

export default NotFound;
