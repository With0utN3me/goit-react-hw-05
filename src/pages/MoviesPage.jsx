import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import MovieList from '../components/MovieList/MovieList';
import css from "./MoviesPage.module.css"
const MoviesPage = ({options}) => {
    const [searchedMovies, setSearchMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const getMovies = useCallback(async (topic) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=1`, options);
            if (response){
                setSearchMovies(response.data.results);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    })

    const query = searchParams.get("query");
    useEffect(() => {
        if (query && query.trim() !== "") {
            getMovies(query);
        } else {
            getMovies("");
        }
    }, [query, getMovies]);

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
                {searchedMovies.length > 0 && <MovieList movies={searchedMovies}/>}
            </div>
        </div>
    )
}
export default MoviesPage;