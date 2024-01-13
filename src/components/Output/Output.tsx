import React, { FC } from 'react';
import './Output.css'
import { useAppSelector } from '../../store/hooks/hooks';
import CocktailCard from '../CocktailCard/CocktailCard';

const Output: FC = () => {
    const { error, list, loading } = useAppSelector(state => state.cocktails)
    return (
        <div className='cocktails_wrapper'>
            {
                loading ?
                    <h1>Loading...</h1>
                    : error ?
                        <span className='error animate__flash animate__animated'>{error}</span>
                        : list?.length > 0 &&
                        list.map(el => <CocktailCard key={el.idDrink} {...el} />)
            }
        </div>
    );
};

export default Output;