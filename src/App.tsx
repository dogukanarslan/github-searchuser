import { useState } from 'react';
import { Menu } from 'react-feather';
import { Sidebar, Main, Button } from 'components';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div
        className={`fixed top-0 h-full transition-[width] duration-500 overflow-x-hidden${
          isSidebarOpen ? ' w-[200px]' : ' w-16'
        } bg-gray-100 shadow-md`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div
        className={`${
          isSidebarOpen ? 'ml-[200px] ' : 'ml-16 '
        }px-6 transition-[margin] duration-500`}
      >
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu />
        </Button>
        <Main />
      </div>
    </>
  );
};
