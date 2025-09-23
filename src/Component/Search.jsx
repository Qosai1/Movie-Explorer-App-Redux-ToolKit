import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import MovieGrid from "../Component/MovieGrid";
import FilterByGenreAndRating from "./FilterByGenreAndRating";
import { setQuery, setResults, clearSearch } from "../Redux/searchSlice";

export default function Search() {
  const dispatch = useDispatch();

  const movies = useSelector((s) => s.movies.items) || [];
  const { query, results } = useSelector((s) => s.search);

  const handleSearch = (event) => {
    event.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      dispatch(clearSearch());
      return;
    }
    const r = movies.filter((m) => {
      const title = (m.title || "").trim().toLowerCase();
      return title.includes(q);
    });
    dispatch(setResults(r));
  };

  return (
    <div className="search_card">
      <form className="search" onSubmit={handleSearch}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {query && (
        <>
          {results.length > 0 ? (
            <div style={{ marginTop: '16px' }}>
              <h3>Search Results</h3>
              <MovieGrid items={results} />
            </div>
          ) : (
            <div className="status" style={{ marginTop: '16px' }}>
             
            </div>
          )}
        </>
      )}

      <div className="search_card" style={{ marginTop: '16px' }}>
        <h3>Filter By Genre and Rating</h3>
        <FilterByGenreAndRating />
      </div>
    </div>
  );
}
