import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';
import PropTypes from 'prop-types';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';

  useEffect(() => {
    (async () => {
      await fetch(`${BASE_URL}3/trending/movie/week?api_key=${KEY}`)
        .then(res => res.json())
        .then(movies => setMovies(movies.results))
        .catch(error => {
          setError(error);
        });
    })();
  }, []);
  return (
    <div className={styles.homePage}>
      {error && <p>Ошибка запроса"</p>}
      {movies && (
        <ul className={styles.homePageList}>
          {movies.map(movie => (
            <li className={styles.homePageListItem} key={movie.id}>
              <Link
                className={styles.homePageListItemLink}
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="poster"
                />
                <p className={styles.homePageListTitle}>
                  {movie.original_title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

HomePage.propTypes = {
  movies: PropTypes.array,
  error: PropTypes.any,
};
