import React, { FC, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Output from '../../components/Output/Output';
import { useAppDispatch } from '../../store/hooks/hooks';
import { fetchByAllCocktails } from '../../store/slices/cocktailSlice';

const Home: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchByAllCocktails())
    }, [dispatch])

    return (
        <div>
            <Header />
            <Output />
        </div>
    );
};

export default Home;