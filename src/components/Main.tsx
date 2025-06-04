import { Route, Routes } from 'react-router-dom';
import { Home, Details, Search, Repositories } from '../pages';

export const Main = () => {
  return (
    <div className="mt-2">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Details/>} />
        <Route path="/details/:login" element={<Details/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/repositories" element={<Repositories/>} />
      </Routes>
    </div>
  );
};
