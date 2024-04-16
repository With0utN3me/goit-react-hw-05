
import { Link, useLocation } from 'react-router-dom';
const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
            <ul>{movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={location}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div>
                            <p>Title: {movie.title}</p>
                            <p>Release date: {movie.release_date}</p>
                        </div>
                    </Link>
                </li>
            ))}</ul>
    )
}
export default MovieList;