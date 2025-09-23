import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './ThemeSlice'
import favoritesReduser from './favoritesSlice'
import moviesReducer from './MoviesSlice'
import genresReducer from './genresSlice'
import filtersReducer from './filtersSlice'
import searchReducer from './searchSlice'
export const store= configureStore({
    reducer:{
          movies: moviesReducer,
         theme:themeReducer,
         favorites:favoritesReduser,
         genres: genresReducer,
         filters: filtersReducer,
         search: searchReducer,
    }
})