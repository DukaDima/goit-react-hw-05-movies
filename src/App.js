import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePage from './views/HomePage/HomePage';
import MoviesPage from './views/MoviesPage/MoviesPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import MovieDetailPage from './views/MovieDetailPage/MovieDetailPage';
function App() {
  return (
    <div>
      <Container>
        <AppBar />
      </Container>
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
    </div>
  );
}

export default App;
