import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export default function MovieDetails() {
  const { id } = useParams();
  const movieId = Number(id);

  const listItem = useSelector((s) =>
    s.movies.items.find((m) => m.id === movieId)
  );

  const [result, setResult] = useState(listItem || null);


  useEffect(() => {

    if (listItem) {
      setResult(listItem);

      return;
    }

  }, [movieId, listItem]);


  if (!result) return <div style={{ padding: 20 }}>No Results</div>;

  const posterSrc = result.poster_path ? IMG_BASE + result.poster_path : null;

  return (
    <div className='card_details'>
      <div className='movie_details'>
        <div className='title_details'>
          <span className='label'>Title:</span>
          <span className='value'>{result.title || result.name || '-'}</span>
        </div>

        <div className='poster'>
          {posterSrc ? (
            <img src={IMG_BASE + result.poster_path||null} alt={result.title || 'Movie'} />
          ) : (
            <div>No Image</div>
          )}

          <div className='overview'>
            <span className='label'>Overview:</span>
            <span className='value'>
              {result.overview || 'No overview available.'}
            </span>
          </div>
        </div>

        <div className='details'>
          <div className='releaseDate'>
            <span className='label'>Release Date:</span>
            <span className='value'>
              {result.release_date || result.first_air_date || '-'}
            </span>
          </div>

          <div>
            <span className='label'>Vote Average:</span>
            <span className='value'>{result.vote_average ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
