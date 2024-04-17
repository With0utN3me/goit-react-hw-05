import { useParams, useLocation } from 'react-router-dom';
import {useEffect, Suspense} from 'react';
import { Link, Outlet } from "react-router-dom";
import GoBack from '../components/Navigation/GoBack';
import css from "./MovieDetailsPage.module.css"
const MovieDetailsPage = ({getMovieById, movie}) => {
    const { movieId } = useParams();

    useEffect(() => {
        getMovieById(movieId)
    }, []);

    const location = useLocation();
    let backLinkHref = '/movies';
    if(location.state){
        backLinkHref = `/movies${location.state.search}`;
    }
    console.log(backLinkHref);
    console.log(location.state);


    return (
        <div className={css.mainWrap}>
            <GoBack to={backLinkHref}>Go back to movies list.</GoBack>
            <div className={css.centerWrap}>
            <div>
            <h2 className={css.trend}>Movie Details</h2>
            {movie.poster_path ? (
                <img className={css.detailImage} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
                <img className={css.detailImage} src='.\assets\noPoster.jpg' alt='No Photo'/>
            )}
            </div>
            <div className={css.detailInfo}>
                <h2 className={css.title}>{movie.title}</h2>
                <ul className={css.infoList}>
                    <li className={css.listItem}>
                        <h3 className={css.infoTitle}>Release date</h3>
                        <p className={css.info}>{movie.release_date}</p>
                    </li>

                    <li className={css.listItem}>
                        <h3 className={css.infoTitle}>Overview</h3>
                        <p className={css.info}>{movie.overview}</p>
                    </li>

                    <li className={css.listItem}>
                        <h3 className={css.infoTitle}>Rating</h3>
                        <p className={css.info}>{movie.vote_average ? movie.vote_average.toFixed(1) : "No rating yet!"}</p>
                    </li>

                    <li className={css.listItem}>
                        <h3 className={css.infoTitle}>Genres</h3> 
                        <p className={css.info}>{movie.genres ? movie.genres.map(genre => genre.name).join(', ') : "No info on genres!"}</p>
                    </li>
                </ul>
            </div>
            </div>
            <div className={css.addInfo}>
                <h3 className={css.infoTitle}>Additional information</h3>
                <div className={css.linkCenter}>
                    <Link className={css.link} to={{ pathname: `/movies/${movieId}/cast`, state: location.state }}><p>Movie Cast</p></Link>
                    <Link className={css.link}to={{ pathname: `/movies/${movieId}/reviews`, state: location.state }}><p>Movie Reviews</p></Link>
                </div>
            </div>
            <div className={css.addListWrap}>
                <Suspense fallback={<div className={css.load}>Loading subpage...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}
export default MovieDetailsPage;