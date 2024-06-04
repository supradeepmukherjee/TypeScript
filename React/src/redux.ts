import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

export type StateType = { count: number }

const initialState: StateType = { count: 0 }

const rootSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, { payload }: PayloadAction<number>) => { state.count += payload },
        decrement: (state, { payload }: PayloadAction<number>) => { state.count -= payload },
    }
})

export const store = configureStore({ reducer: rootSlice.reducer })

export const { decrement, increment } = rootSlice.actions
type Q = ReturnType<typeof store.getState>