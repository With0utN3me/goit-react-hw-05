import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import css from "./MovieReviews.module.css"
const MovieReviews = ({options}) => {
    const [movieReviews, setReviews] = useState([]);
    const getReviews = async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`, options);
            if (response){
                setReviews(response.data.results);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const { movieId } = useParams();
    useEffect(() => {
        getReviews(movieId);
    }, [movieId]);
    return (
        <>
            {movieReviews && movieReviews.length > 0 ? <ul className={css.reviewList}>{movieReviews.map(review => (
                <li className={css.reviewItem} key={review.id}>
                    <h4 className={css.author}>Author: {review.author}</h4>
                    <p className={css.reviewText}>{review.content}</p>
                </li>
            ))}</ul> : <p className={css.noReview}>There are no reviews yet.</p>}
        </>
    )
}
export default MovieReviews;