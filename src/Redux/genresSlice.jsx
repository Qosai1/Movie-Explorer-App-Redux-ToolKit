
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const GENRES_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjM1MWE1MWZhNjUzNTE4NTE0ZmRmMTk4NDQ1OGJhMiIsIm5iZiI6MTc1NzQxMzEyNC42NTUsInN1YiI6IjY4YmZmZjA0M2JmMmI5MDhiZjhjZjljNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pMVtSGgx7PbxR3x8udy8P-oDxPB_JMXRnxWIHNhYiq4",
  },
};

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_,{ rejectWithValue }) => {
    try {
      const res = await fetch(GENRES_URL,GENRES_OPTIONS);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      return data.genres ?? [];
    } catch (e) {
      return rejectWithValue(e.message || 'Failed to fetch genres');
    }
  }
);

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    list: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch genres';
      });
  },
});

export default genresSlice.reducer;
