import { useEffect, useMemo } from "react";
import MovieGrid from "../Component/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../Redux/genresSlice";
import { setGenreId, setRating, resetFilters } from "../Redux/filtersSlice";

export default function FilterByGenreAndRating() {

  const movies = useSelector((s) => s.movies.items) || [];
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.genres);
  const { genreId, rating } = useSelector((s) => s.filters);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const ratingOptions = useMemo(() => {
    const uniq = new Set(movies.map((m) => Math.floor(m.vote_average)));
    return [...uniq].sort((a, b) => b - a);
  }, [movies]);

  const results = useMemo(() => {
   
    return movies.filter((m) => {
      const inGenre =
        genreId === "" || m.genre_ids?.includes(Number(genreId));
      const matchRating =
        rating === "" || Math.floor(m.vote_average) === Number(rating);
      return inGenre && matchRating;
    });
  }, [movies, genreId, rating]);

  const active = genreId !== "" || rating !== "";

  if (error) return <div>Error {error}</div>;

  return (
    <>
      <div className="filter">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          value={genreId}
          onChange={(e) => dispatch(setGenreId(e.target.value))}
          disabled={loading}
        >
          <option value="">All</option>
          {list.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => dispatch(setRating(e.target.value))}
        >
          <option value="">All</option>
          {ratingOptions.map((r) => (
            <option key={r} value={Math.floor(r)}>
              {Math.floor(r)}
            </option>
          ))}
        </select>

        {(genreId || rating) && (
          <button onClick={() => dispatch(resetFilters())}>Reset</button>
        )}
      </div>

      {active ? <MovieGrid items={results} /> : null}
    </>
  );
}
