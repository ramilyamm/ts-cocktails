import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { useParams } from 'react-router-dom';
import { fetchByIngredients } from '../../store/slices/ingredientSlice';

const Ingredient: FC = () => {
    const dispatch = useAppDispatch()
    const { name } = useParams()

    const { ingredient, loading } = useAppSelector(state => state.ingredient)

    useEffect(() => {
        if (name) {
            dispatch(fetchByIngredients(name))
        }
    }, [name, dispatch])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h2>{ingredient?.strIngredient}</h2>
            <img src={`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`} alt={ingredient?.strIngredient} />
            <h2>{ingredient?.strDescription}</h2>
            <h2>{ingredient?.strAlcohol}</h2>
            <h2>{ingredient?.strType}</h2>
        </div>
    );
};

export default Ingredient;