import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";

import HomePage from '../pages/HomePage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import MoviesPage from '../pages/MoviesPage';
import NotFoundPage from '../pages/NotFoundPage';

import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';
import Navigation from './Navigation/Navigation';

const App = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmY0NTQ5ZWFjOWI5NGZiMjE4MjllODQ0ZDZjYmNkMyIsInN1YiI6IjY2MWQ1ZmYzZmQ0YTk2MDE4NjZjNWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KlgWz20RIDirCe2-Y6PsAoagIIf4qSaURXggz0HXvTk";

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [movie, setMovie] = useState({});

    const getTrendingMovies = async () => {
        try {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey,
                }
            };
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

    const getMovieById = async (movieId) => {
        try {
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey,
                }
            };
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
            if (response){
                setMovie(response.data);
                console.log(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path='/' element={<HomePage moviesList={trendingMovies} />} />
                <Route path='/movies' element={<MoviesPage />} />
                    <Route path='/movies/:movieId' element={<MovieDetailsPage getMovieById={getMovieById} movie={movie}/>}>
                        <Route path='cast' element={<MovieCast />} />
                        <Route path='reviews' element={<MovieReviews />} />
                    </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
export default App;

