import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    genreId: '',
    rating: '',
  },
  reducers: {
    setGenreId: (state, action) => { state.genreId = action.payload; },
    setRating:  (state, action) => { state.rating  = action.payload; },
    resetFilters: (state) => { state.genreId = ''; state.rating = ''; },
  },
});

export const { setGenreId, setRating, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
