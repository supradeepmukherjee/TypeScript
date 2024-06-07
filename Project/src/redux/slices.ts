import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: State = {
    loading: false,
    words: [],
    result: []
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        wordsRequest: state => {
            state.loading = true
        },
        wordsSuccess: (state, { payload }: PayloadAction<Word[]>) => {
            state.loading = false
            state.words = payload
        },
        wordsFail: (state, { payload }: PayloadAction<string>) => {
            state.loading = false
            state.error = payload
        },
        saveResult: (state, { payload }: PayloadAction<string[]>) => {
            state.loading = false
            state.result = payload
        },
        clearState: state => {
            state.loading = false
            state.result = []
            state.words = []
            state.error = undefined
        }
    }
})

export const { clearState, saveResult, wordsFail, wordsRequest, wordsSuccess } = rootSlice.actions
export default rootSlice.reducer