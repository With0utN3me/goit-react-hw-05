import { useParams, useLocation } from 'react-router-dom';
import {useEffect} from 'react';
const MovieDetailsPage = ({getMovieById, movie}) => {
    const { movieId } = useParams();

    useEffect(() => {
        getMovieById(movieId)
    }, []);

    const location = useLocation();
    const backLinkHref = location.state ?? '/movies';
    return (
        <div>
            <p>Movie Details Page</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div>
                <h2>{movie.title}</h2>
                <ul>
                    <li>
                        <h3>Release date</h3>
                        {movie.release_date}
                    </li>

                    <li>
                        <h3>Overview</h3>
                        {movie.overview}
                    </li>

                    <li>
                        <h3>Rating</h3>
                        {movie.vote_average.toFixed(1)}
                    </li>

                    <li>
                        <h3>Genres</h3> 
                        {movie.genres && movie.genres.map(genre => genre.name).join(', ')}
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default MovieDetailsPage;