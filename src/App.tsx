import React, { ChangeEventHandler, FC, useEffect } from 'react';
import './App.css'
import 'animate.css';
import Main from './components/Main/Main';
import { useAppDispatch } from './store/hooks/hooks';
import { fetchByGlassesList } from './store/slices/cocktailSlice';

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchByGlassesList())
  }, [dispatch])

  return (
    <div>
      <Main />
    </div>
  );
};

export default App;