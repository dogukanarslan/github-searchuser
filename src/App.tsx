import { useAppDispatch } from 'app/store';
import { Main, Header } from 'components';
import { getAuthenticated } from 'features/singleUser/singleUserSlice';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthenticated());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <Header />
      <Main />
    </div>
  );
};
