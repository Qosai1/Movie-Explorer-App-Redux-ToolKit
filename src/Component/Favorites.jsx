// src/Component/Favorites.jsx
import { useSelector } from 'react-redux';
import MovieGrid from './MovieGrid';

export default function Favorites() {
  const favs = useSelector(s => s.favorites.items) || [];
  return <MovieGrid items={favs} />;  
}
