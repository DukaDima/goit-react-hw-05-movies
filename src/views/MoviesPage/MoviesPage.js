import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styles from './MoviesPage.module.css';
// import SearchMovies from '../SearchMovies/SearchMovies';
import PropTypes from 'prop-types';

const SearchMovies = lazy(() =>
  import('../SearchMovies/SearchMovies' /* webpackChunkName: "SearchMovies" */),
);

export default function MoviesPage() {
  const [input, setName] = useState('');
  const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const nameChange = e => {
    setName(e.currentTarget.value);
  };

  const onSearchMovie = e => {
    e.preventDefault();

    history.push({
      ...location,
      search: `name=${input}`,
    });

    setQuery(input);
    setName('');
  };
  const keyWord = new URLSearchParams(location.search).get('name');

  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';

  useEffect(() => {
    (async () => {
      await fetch(
        `${BASE_URL}3/search/movie?api_key=${KEY}&language=en-US&query=${keyWord}&page=1&include_adult=false`,
      )
        .then(res => res.json())
        .then(searchMovies => setSearchMovies(searchMovies.results))
        .catch(error => {
          setError(error);
        });
    })();
  }, [query]);

  return (
    <div className={styles.moviesPage}>
      <form className="">
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title=""
          required
          value={input}
          onChange={nameChange}
        />
        <NavLink to={`${url}${location.search}`}>
          <button type="submit" onClick={onSearchMovie}>
            Add
          </button>
        </NavLink>
      </form>
      <hr />

      <Suspense fallback={<h1>Loading...</h1>}>
        {/* <Route path={`${url}${location.search}`}> */}
        <SearchMovies movies={searchMovies} error={error} />
        {/* </Route> */}
      </Suspense>
    </div>
  );
}

MoviesPage.propTypes = {
  input: PropTypes.string,
};

// https://api.themoviedb.org/3/search/movie?api_key=c92870441de8144ed19a06989020347f&language=en-US&query=batman&page=1&include_adult=false
