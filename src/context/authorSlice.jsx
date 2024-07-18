import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authors: [],
    currentAuthor: null,
};

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        setAuthors(state, action) {
            state.authors = action.payload;
        },
        setCurrentAuthor(state, action) {
            state.currentAuthor = action.payload;
        },
    },
});

export const { setAuthors, setCurrentAuthor } = authorSlice.actions;

export default authorSlice.reducer;
