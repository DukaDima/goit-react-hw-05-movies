import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CastPage.module.css';

export default function CastPage() {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';

  useEffect(() => {
    (async () => {
      await fetch(
        `${BASE_URL}3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
      )
        .then(res => res.json())
        .then(actors => setActors(actors.cast.slice(0, 5)))
        .catch(error => {
          setError(error);
        });
    })();
  }, [movieId]);

  return (
    <div className={styles.CastPage}>
      <h2>
        <p>CastPage movieId {movieId}</p>
      </h2>
      {error && <p>Ошибка запроса"</p>}

      {actors.length > 0 ? (
        <>
          <ul className="">
            {actors.map(actor => (
              <li className="" key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt="actor"
                />
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>Error</p>
        </>
      )}
    </div>
  );
}
