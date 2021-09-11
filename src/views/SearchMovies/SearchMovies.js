import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchMovies.module.css';

export default function SearchMovies({ movies }) {
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  //   const { movieId } = useParams();
  console.log(movies);
  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';

  useEffect(() => {
    (async () => {
      await fetch(
        `${BASE_URL}3/trending/movie?api_key=${KEY}&language=en-US&query=${movies}&page=1&include_adult=false`,
      )
        .then(res => res.json())
        .then(searchMovies => setSearchMovies(searchMovies.results))
        .catch(error => {
          setError(error);
        });
    })();
  }, []);
  console.log(searchMovies);
  return (
    <div className="">
      {error && <p>Ошибка запроса"</p>}
      {searchMovies && (
        <ul className="">
          {searchMovies.map(movie => (
            <li className="" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="poster"
                />
                <p>{movie.original_title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// https://api.themoviedb.org/3/search/movie?api_key=c92870441de8144ed19a06989020347f&language=en-US&query=batman&page=1&include_adult=false
