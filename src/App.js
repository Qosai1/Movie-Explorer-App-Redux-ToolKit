import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Component/Header";
import "./style.css";
import MovieDetails from "./Component/MovieDetails";
import Favorites from "./Component/Favorites";
import Search from "./Component/Search";
import MovieGrid from "./Component/MovieGrid";
import BackTop from './Component/BackToTop';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Search />
              <MovieGrid />
              <BackTop />
            </>
          }
        />
        <Route
          path='/favorites'
          element={
            <>
              <Header />
              <Favorites />
            </>
          }
        />
        <Route
          path='/movie/:id'
          element={
            <>
              <Header />
              <MovieDetails />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
