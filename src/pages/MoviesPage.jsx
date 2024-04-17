import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';
import css from "./MoviesPage.module.css"
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
            <form className={css.form} onSubmit={handleSubmit}>
                <button className={css.btn} type="submit">&#x1f50d;</button>
                <input
                    id='search_bar'
                    type="text"
                    autoComplete="off"
                    name="movie"
                    autoFocus
                    placeholder="Search movies"
                    className={css.input}
                />
            </form>
            <div className={css.listWrap}>
                {moviesList.length > 0 && <MovieList movies={moviesList}/>}
            </div>
        </div>
    )
}
export default MoviesPage;