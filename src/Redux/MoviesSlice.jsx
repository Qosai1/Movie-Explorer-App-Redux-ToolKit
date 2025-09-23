import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_KEY  = "36351a51fa653518514fdf1984458ba2";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&page=${page}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    status: 'not_started',
    error: null,
    page: 1,
    totalPages: 1,
    searchQuery: '',
    selectedGenre: null,
  },
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setGenre: (state, action) => { state.selectedGenre = action.payload; },
    clearMovies: (state) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const unique = action.payload.results.filter(
          m => !state.items.some(x => x.id === m.id)
        );
        state.items = [...state.items, ...unique];
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, setGenre, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
