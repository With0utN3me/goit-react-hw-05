import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
            <ul>{movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={location}>
                        {movie.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        ) : (
                            <img src='.\assets\noPoster.jpg' alt='No Photo'/>
                        )}
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