import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchByDetailCocktail } from '../../store/slices/detailSlice';
import { IIngrList } from '../../store/modules';

const Detail: FC = () => {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const [query] = useState(searchParams.get('c'))
    const { loading, error, detail } = useAppSelector(state => state.detail)

    const listIngredients: IIngrList = () => {
        const arr = []
        for (let key in detail) {
            if (key.includes('strIngredient') && detail[key] !== null) {
                arr.push(detail[key])
            }
        }
        return arr
    }

    useEffect(() => {
        query && dispatch(fetchByDetailCocktail(query))
    }, [dispatch, query])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <span>{error}</span>
    }
    return (
        <div>
            <h2>{detail?.strDrink}</h2>
            <img src={detail?.strDrinkThumb} alt={detail?.strDrink} />
            <ol>
                {
                    listIngredients().length > 0 &&
                    listIngredients().map((el, i) => (
                        <Link key={i} to={`/ingredient/${el}`}>
                            <li>{el}</li>
                        </Link>
                    ))
                }
            </ol>
            <h2>{detail?.strInstructions}</h2>
            <h3>{detail?.strGlass}</h3>
            <h3>Alco: {detail?.strAlcoholic}</h3>
        </div>
    );
};

export default Detail;