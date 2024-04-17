import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import css from "./MovieList.module.css"
const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
            <ul className={css.movieList}>{movies.map(movie => (
                <li className={css.listItem} key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={location} className={css.link}>
                            {movie.poster_path ? (
                                <img className={css.listImage} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            ) : (
                                <img className={css.listImage} src='.\assets\noPoster.jpg' alt='No Photo'/>
                            )}
                        <div className={css.movieInfoWrap}>
                            <p className={css.movieInfo}>Title: {movie.title}</p>
                            <p className={css.movieInfo}>Released: {movie.release_date}</p>
                        </div>
                    </Link>
                </li>
            ))}</ul>
    )
}
export default MovieList;