import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { cocktailsAPI } from "../../axios"
import { IIngredients } from "../modules"

type IngredientState = {
    ingredient: IIngredients | null
    error: null | string | undefined
    loading: boolean
}

const initialState: IngredientState = {
    ingredient: null,
    error: null,
    loading: false
}

export const fetchByIngredients = createAsyncThunk<IIngredients, string, { rejectValue: string }>(
    'ingredient/fetchByIngredients',
    async (name, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getByIngredient(name)
            console.log(res);
            if (res.status !== 200) {
                throw new Error('Server error')
            }
            const data = res.data.ingredients[0] as IIngredients
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                return rejectWithValue(message);
            }
            // unhandled non-AxiosError goes here
            throw error

        }
    }

)

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchByIngredients.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByIngredients.fulfilled, (state, action) => {
            state.ingredient = action.payload
            state.loading = false
        })
        addCase(fetchByIngredients.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
    }
})

export default ingredientSlice.reducer
