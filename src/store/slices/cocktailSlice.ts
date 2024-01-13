import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { cocktailsAPI } from "../../axios";
import { IDrink, IGlass } from "../modules";


type CocktailsState = {
    list: IDrink[]
    error: null | string | undefined
    loading: boolean
    list_glasses: IGlass[]
}

const initialState: CocktailsState = {
    list: [],
    list_glasses: [],
    error: null,
    loading: false
}

export const fetchByAllCocktails = createAsyncThunk<IDrink[], void, { rejectValue: string }>(
    'cocktails/fetchByAllCocktails',
    async (_, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getAllCocktails()
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            return res.data.drinks
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


export const fetchByRandom = createAsyncThunk<IDrink[], void, { rejectValue: string }>(
    'cocktails/fetchByRandom',
    async (_, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getRandom()
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            return res.data.drinks
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

export const fetchByFilter = createAsyncThunk<IDrink[], string, { rejectValue: string }>(
    'cocktails/fetchByFilter',
    async (option, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getFilter(option)
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            return res.data.drinks
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

export const fetchByName = createAsyncThunk<IDrink[], string, { rejectValue: string }>(
    'cocktails/fetchByName',
    async (value, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getByName(value)
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            return res.data.drinks
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

export const fetchByGlass = createAsyncThunk<IDrink[], string, { rejectValue: string }>(
    'cocktails/fetchByGlass',
    async (value, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getByGlass(value)
            console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            const data = res.data.drinks as IDrink[]
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

export const fetchByGlassesList = createAsyncThunk<IGlass[], void, { rejectValue: string }>(
    'cocktails/fetchByGlassesList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await cocktailsAPI.getGlassesList()
            console.log(res);
            if (res.status !== 200) {
                throw new Error('server error')
            }
            const data = res.data.drinks as IGlass[]
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

const CocktailSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchByAllCocktails.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByAllCocktails.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        addCase(fetchByAllCocktails.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
        addCase(fetchByRandom.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByRandom.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        addCase(fetchByRandom.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
        addCase(fetchByFilter.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByFilter.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        addCase(fetchByFilter.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
        addCase(fetchByName.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByName.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        addCase(fetchByName.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
        addCase(fetchByGlass.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByGlass.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
        })
        addCase(fetchByGlass.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = '404 not found!'
            }
            else {
                state.error = action.payload
            }
        })
        addCase(fetchByGlassesList.pending, (state) => {
            state.error = null
            state.loading = true
        })
        addCase(fetchByGlassesList.fulfilled, (state, action) => {
            state.list_glasses = action.payload
            state.loading = false
        })
        addCase(fetchByGlassesList.rejected, (state, action) => {
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

export default CocktailSlice.reducer