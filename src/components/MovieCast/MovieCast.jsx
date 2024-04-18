import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import css from "./MovieCast.module.css"
const MovieCast = ({options}) => {
    const [movieCast, setMovieCast] = useState([]);
    const getCast = async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
            if (response){
                setMovieCast(response.data.cast);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const { movieId } = useParams();
    useEffect(() => {
        getCast(movieId);
    }, [movieId]);

    return (
        <>
            {movieCast && movieCast.length > 0 ? (
                <ul className={css.castList}>
                    {movieCast.map(actor => (
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