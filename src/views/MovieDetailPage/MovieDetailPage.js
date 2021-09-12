import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
// import CastPage from '../CastPage/CastPage';
// import ReviewsPage from '../ReviewsPage/ReviewsPage';
import styles from './MovieDetailPage.module.css';
import PropTypes from 'prop-types';
const CastPage = lazy(() =>
  import('../CastPage/CastPage' /* webpackChunkName: "CastPage" */),
);

const ReviewsPage = lazy(() =>
  import('../ReviewsPage/ReviewsPage' /* webpackChunkName: "ReviewsPage" */),
);
export default function MovieDetailPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';
  useEffect(() => {
    (async () => {
      await fetch(`${BASE_URL}3/movie/${movieId}?api_key=${KEY}`)
        .then(res => res.json())
        .then(movie => setMovie(movie));
    })();
  }, [movieId]);
  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div className={styles.detailPage}>
      {movie && (
        <>
          <button
            type="button"
            onClick={onGoBack}
            className={styles.detailPageButton}
          >
            Go back
          </button>
          <hr />
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`movie${movie.original_title}`}
          />
          <h3>{movie.original_title}</h3>
          <p>Overview</p>
          <p>{movie.overview}</p>
          <p>Genres</p>
          <ul className={styles.detailPageList}>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{`User Score:  ${movie.vote_average * 10} %`}</p>
        </>
      )}
      <hr />
      <p>Additional information</p>
      <ul className={styles.detailPageList}>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/movies/:movieId/cast">
            <CastPage />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <ReviewsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

MovieDetailPage.propTypes = {
  movie: PropTypes.object,
  error: PropTypes.any,
};
