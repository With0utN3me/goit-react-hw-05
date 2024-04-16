import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
const MovieCast = ({cast, getCast }) => {
    const { movieId } = useParams();
    useEffect(() => {
        getCast(movieId);
    }, []);

    return (
        <>
            {cast && cast.length > 0 ? (
                <ul>
                    {cast.map(actor => (
                        <li key={actor.id}>
                            
                            {actor.profile_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="No Photo" />
                            ) : (
                                <img src=".\assets\noActor.jpg" alt="No Photo" />
                            )}
                            <h4>Character: {actor.character}</h4>
                            <h4>Name: {actor.name}</h4>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There is a problem with the actors cast.</p>
            )}
        </>
    )
}
export default MovieCast;