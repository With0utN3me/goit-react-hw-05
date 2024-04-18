import MovieList from "../components/MovieList/MovieList";
import axios from 'axios';
import css from "./HomePage.module.css"
import { useState, useEffect } from 'react';
const HomePage = ({options}) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const getTrendingMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
            if (response.data.results.length > 0){
                setTrendingMovies(response.data.results);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getTrendingMovies();
    }, []);
    return(
        <div className={css.main}>
            <h2 className={css.trend}>Trending today</h2>
            <MovieList
                movies={trendingMovies}
            />
        </div>)
}
export default HomePage;