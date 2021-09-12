import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SearchMovies.module.css';

export default function SearchMovies({ movies, error }) {
  const location = useLocation();
  return (
    <div className={styles.homePage}>
      {!movies ||
        (error && (
          <p>Ошибка запроса.Проверьте правильность ввода ключевого слова</p>
        ))}
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

SearchMovies.propTypes = {
  searchMovies: PropTypes.array,
  error: PropTypes.any,
};
