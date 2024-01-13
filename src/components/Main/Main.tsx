import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Detail from '../../pages/Detail/Detail';
import Ingredient from '../../pages/Ingredient/Ingredient';

const Main: FC = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/full-cocktail-info/:name' element={<Detail />} />
                <Route path='/ingredient/:name' element={<Ingredient />} />

            </Routes>
        </main>
    );
};

export default Main;