import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
const MovieReviews = ({reviews, getReviews}) => {
    const { movieId } = useParams();
    useEffect(() => {
        getReviews(movieId);
    }, []);
    return (
        <>
            {reviews && reviews.length > 0 ? <ul>{reviews.map(review => (
                <li key={review.id}>
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                </li>
            ))}</ul> : <p>There are no reviews yet.</p>}
        </>
    )
}
export default MovieReviews;