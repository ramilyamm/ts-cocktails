import { configureStore } from "@reduxjs/toolkit";
import cocktailSlice from "./slices/cocktailSlice";
import detailSlice from "./slices/detailSlice";
import ingredientSlice from "./slices/ingredientSlice";


export const store = configureStore({
    reducer: {
        cocktails: cocktailSlice,
        detail: detailSlice,
        ingredient: ingredientSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch