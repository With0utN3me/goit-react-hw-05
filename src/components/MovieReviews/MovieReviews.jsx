import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import css from "./MovieReviews.module.css"
const MovieReviews = ({reviews, getReviews}) => {
    const { movieId } = useParams();
    useEffect(() => {
        getReviews(movieId);
    }, []);
    return (
        <>
            {reviews && reviews.length > 0 ? <ul className={css.reviewList}>{reviews.map(review => (
                <li className={css.reviewItem} key={review.id}>
                    <h4 className={css.author}>Author: {review.author}</h4>
                    <p className={css.reviewText}>{review.content}</p>
                </li>
            ))}</ul> : <p className={css.noReview}>There are no reviews yet.</p>}
        </>
    )
}
export default MovieReviews;