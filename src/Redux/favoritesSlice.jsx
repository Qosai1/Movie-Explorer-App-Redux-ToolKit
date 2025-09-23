
import { createSlice } from "@reduxjs/toolkit";
const saved =  JSON.parse(localStorage.getItem('favorites')||'[]')
    const favoritesSlice= createSlice({
        name: 'favorites',
             initialState: { items: Array.isArray(saved) ? saved : [] },
        reducers:{
            addFavorite:(state,action)=>{
                if(!state.items.some(m=>m.id=== action.payload.id)){
                    state.items.push(action.payload)
                    localStorage.setItem('favorites',JSON.stringify(state.items))
                }
            },
            removeFavorite:(state,action)=>{
                state.items=state.items.filter(m=>m.id !== action.payload)
                localStorage.setItem('favorites',JSON.stringify(state.items))
            }
        }
    })
    export const  {addFavorite,removeFavorite}=favoritesSlice.actions
    export default favoritesSlice.reducer