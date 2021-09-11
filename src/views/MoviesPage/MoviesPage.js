import { useState } from 'react';
import {
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styles from './MoviesPage.module.css';
import SearchMovies from '../SearchMovies/SearchMovies';

export default function MoviesPage() {
  const [input, setName] = useState('');
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const nameChange = e => {
    setName(e.currentTarget.value);
  };

  const onSearchMovie = e => {
    e.preventDefault();
    const searchMovies = new URLSearchParams(location.search).get('query');
    console.log(searchMovies);
    history.push({
      ...location,
      search: `query=${input}`,
    });

    setName('');
  };
  console.log(input);
  console.log(url);
  console.log(location);
  console.log(`${url}${location.search}`);
  return (
    <div className={styles.moviesPage}>
      <h2>MoviesPage</h2>
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
          <button type="submit" onSubmit={onSearchMovie}>
            Add
          </button>
        </NavLink>
      </form>
      <hr />
      <Route path={`${url}${location.search}`}>
        <SearchMovies movies={input} />
      </Route>
    </div>
  );
}
