import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import styles from './ReviewsPage.module.css';
import PropTypes from 'prop-types';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const BASE_URL = 'https://api.themoviedb.org/';
  const KEY = 'c92870441de8144ed19a06989020347f';

  useEffect(() => {
    (async () => {
      await fetch(
        `${BASE_URL}3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
      )
        .then(res => res.json())
        .then(reviews => setReviews(reviews.results))
        .catch(error => {
          setError(error);
        });
    })();
  }, [movieId]);
  return (
    <div className={styles.ReviewsPage}>
      {error && <p>Error</p>}
      {reviews.length > 0 ? (
        <>
          <ul className="">
            {reviews.map(review => (
              <li className="" key={shortid.generate()}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>Reviews not found</p>
        </>
      )}
    </div>
  );
}

ReviewsPage.propTypes = {
  reviews: PropTypes.array,
  error: PropTypes.any,
};
