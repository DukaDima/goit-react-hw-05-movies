import { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

// import HomePage from './views/HomePage/HomePage';
// import MoviesPage from './views/MoviesPage/MoviesPage';
// import NotFoundPage from './views/NotFoundPage/NotFoundPage';
// import MovieDetailPage from './views/MovieDetailPage/MovieDetailPage';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const NotFoundPage = lazy(() =>
  import(
    './views/NotFoundPage/NotFoundPage' /* webpackChunkName: "NotFoundPage" */
  ),
);
const MovieDetailPage = lazy(() =>
  import(
    './views/MovieDetailPage/MovieDetailPage' /* webpackChunkName: "MovieDetailPage" */
  ),
);

function App() {
  return (
    <div>
      <Container>
        <AppBar />
      </Container>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
