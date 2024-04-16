import { useParams, useLocation } from 'react-router-dom';
import {useEffect, Suspense} from 'react';
import { Link, Outlet } from "react-router-dom";
import GoBack from '../components/Navigation/GoBack';
const MovieDetailsPage = ({getMovieById, movie}) => {
    const { movieId } = useParams();

    useEffect(() => {
        getMovieById(movieId)
    }, []);

    const location = useLocation();
    let backLinkHref = '/movies';
    if(location.state){
        backLinkHref = location.state.pathname + location.state.search;
    }


    return (
        <div>
            <GoBack to={backLinkHref}>Go back to movies list.</GoBack>
            <p>Movie Details Page</p>
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
                <img src='.\assets\noPoster.jpg' alt='No Photo'/>
            )}
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
                        {movie.vote_average && movie.vote_average.toFixed(1)}
                    </li>

                    <li>
                        <h3>Genres</h3> 
                        {movie.genres && movie.genres.map(genre => genre.name).join(', ')}
                    </li>
                </ul>
            </div>
            <div>
                <h3>Additional information</h3>
                <Link to="cast"><p>Movie Cast</p></Link>
                <Link to="reviews"><p>Movie Reviews</p></Link>
            </div>
            <div>
                <Suspense fallback={<div>Loading subpage...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}
export default MovieDetailsPage;