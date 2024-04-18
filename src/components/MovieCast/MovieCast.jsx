import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import css from "./MovieCast.module.css"
const MovieCast = ({cast, getCast }) => {
    const { movieId } = useParams();
    useEffect(() => {
        getCast(movieId);
    }, [movieId]);

    return (
        <>
            {cast && cast.length > 0 ? (
                <ul className={css.castList}>
                    {cast.map(actor => (
                        <li className={css.castItem} key={actor.credit_id}>
                            
                            {actor.profile_path ? (
                                <img className={css.actorImage} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="No Photo" />
                            ) : (
                                <img className={css.actorImage} src="./noActor.jpg" alt="No Photo" />
                            )}
                            <h4 className={css.actorName}>{actor.name}</h4>
                            <h4 className={css.actorChar}>Character: {actor.character}</h4>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={css.noCast}>There is a problem with the actors cast.</p>
            )}
        </>
    )
}
export default MovieCast;