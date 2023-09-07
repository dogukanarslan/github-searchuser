import { useState } from 'react';
import { Sidebar, Main, Button } from 'components';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`${
          isSidebarOpen ? 'ml-[200px] ' : 'ml-16 '
        }px-6 transition-[margin] duration-500`}
      >
        <Main />
      </div>
    </>
  );
};
