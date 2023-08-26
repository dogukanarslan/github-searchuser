import { Sidebar, Main } from './components';

export const App = () => (
  <div className="p-2">
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-gray-100 shadow-md">
        <Sidebar />
      </div>
      <div className="col-span-4">
        <Main />
      </div>
    </div>
  </div>
);
