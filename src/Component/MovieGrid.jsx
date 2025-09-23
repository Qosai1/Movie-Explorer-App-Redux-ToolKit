import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../Redux/MoviesSlice';
import { addFavorite, removeFavorite } from '../Redux/favoritesSlice';
import { Link } from "react-router-dom";
import { FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ items: overrideItems }) {
  const { items: reduxItems, status, page, totalPages, error } = useSelector(s => s.movies);
  const items = overrideItems ?? reduxItems;                
  const favs  = useSelector(s => s.favorites.items) || [];
  const dispatch = useDispatch();
  const sentinelRef = useRef(null);


  useEffect(() => {
    if (!overrideItems && status === 'not_started') {
      dispatch(fetchMovies(1));
    }
  }, [overrideItems, status, dispatch]);


  useEffect(() => {
    if (overrideItems || !sentinelRef.current) return;

    const more = () => (totalPages == null ? true : page < totalPages);
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && status !== 'loading' && more()) {
          dispatch(fetchMovies(page + 1));
        }
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    );

    ob.observe(sentinelRef.current);
    return () => ob.disconnect();
  }, [overrideItems, dispatch, page, status, totalPages]);

  if (!items || items.length === 0) {
  
    if (status === 'loading' && !overrideItems) return <p>Loading…</p>;
    if (status === 'failed' && !overrideItems)  return <p style={{ color: 'crimson' }}>Error: {error}</p>;
    return <div className='pad'>No matching results found.</div>;
  }

  return (
    <>
      <div className='grid'>
        {items.map(movie => {
          const isFav = Array.isArray(favs) && favs.some(m => m.id === movie.id);
          return (
            <div className='card' key={movie.id}>
              <Link to={`/movie/${movie.id}`} className='card-link'>
                <div className='poster-wrap'>
                  {movie.poster_path ? (
                    <img
                      src={IMG_BASE + movie.poster_path}
                      alt={movie.title}
                      className='movie_img'
                      loading='lazy'
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
                <div className='title'>{movie.title}</div>
                <div className='release_date'>{movie.release_date || '-'}</div>
                <div className='vote_average'><FaStar /> {movie.vote_average}</div>
              </Link>

              <button
                className='bookmark-btn'
                onClick={() =>
                  isFav
                    ? dispatch(removeFavorite(movie.id))
                    : dispatch(addFavorite(movie))
                }
               
              >
                {isFav ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          );
        })}
      </div>

   
      {!overrideItems && <div ref={sentinelRef} style={{ height: 1 }} />}

      {!overrideItems && status !== 'loading' && totalPages && page >= totalPages && (
        <div className='status'>Reached the end.</div>
      )}
    </>
  );
}
