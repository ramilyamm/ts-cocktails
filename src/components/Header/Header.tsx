import React, { ChangeEvent, ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { fetchByAllCocktails, fetchByFilter, fetchByGlass, fetchByName, fetchByRandom } from '../../store/slices/cocktailSlice';

const Header: FC = ({ }) => {
    const { list_glasses } = useAppSelector(state => state.cocktails)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')


    const clickRandom = () => {
        dispatch(fetchByRandom())
    }

    const toggleFilter: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const option = e.target.value
        if (option === "All") {
            dispatch(fetchByAllCocktails())
        } else {
            dispatch(fetchByFilter(option))
        }
    }

    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (value.trim().length) {
            dispatch(fetchByName(value))
        }
        setValue('')
    }

    const toggleGlasses: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const name = e.target.value
        if (name === "All") {
            dispatch(fetchByAllCocktails())
        }
        else {
            dispatch(fetchByGlass(name))
        }
    }


    return (
        <header>
            <form onSubmit={handleSearch}>
                <input
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    type="text" />
                <button>search</button>
            </form>
            <select onChange={toggleFilter}>
                <option value="All">All</option>
                <option value="Alcoholic">Alcoholic</option>
                <option value="Non_Alcoholic">Non_Alcoholic</option>
            </select>
            {
                list_glasses.length > 0 &&
                <select onChange={toggleGlasses}>
                    <option value="All">All</option>
                    {
                        list_glasses.map((el, i) => (
                            <option key={i} value={el.strGlass} >{el.strGlass}</option>
                        ))
                    }
                </select>
            }
            <button onClick={clickRandom}>Мне повезёт!</button>
        </header>
    );
};

export default Header;