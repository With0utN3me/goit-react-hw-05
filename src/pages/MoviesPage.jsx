import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';
const MoviesPage = ({ onSearch, moviesList }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    useEffect(() => {
        if (query && query.trim() !== "") {
            onSearch(query);
        } else {
            onSearch("");
        }
    }, [query, onSearch]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        if (form.elements.movie.value.trim() === "") {
            alert("Please enter search term!");
            return;
        }
        setSearchParams({query: form.elements.movie.value});
        form.reset();
    };


    return(
        <div>
            <p>Movies Page</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">&#x1f50d;</button>
                <input
                    id='search_bar'
                    type="text"
                    autoComplete="off"
                    name="movie"
                    autoFocus
                    placeholder="Search movies"
                />
            </form>
            {moviesList.length > 0 && <MovieList movies={moviesList}/>}
        </div>
    )
}
export default MoviesPage;