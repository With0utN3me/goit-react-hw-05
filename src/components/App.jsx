import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";

import NotFoundPage from '../pages/NotFoundPage';
import Navigation from './Navigation/Navigation';

const HomePage = lazy(() => import('../pages/HomePage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));

const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));

const App = () => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + import.meta.env.VITE_APIKEY,
        }
    };
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [movie, setMovie] = useState({});
    const [searchedMovies, setSearchMovies] = useState([]);
    const [movieCast, setMovieCast] = useState([]);
    const [movieReviews, setReviews] = useState([]);

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

    const getMovieById = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
            if (response){
                setMovie(response.data);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getMovies = async (topic) => {
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
    }
    const getCast = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
            if (response){
                setMovieCast(response.data.cast);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getReviews = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`, options);
            if (response){
                setReviews(response.data.results);
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
            <Suspense fallback={<div>Loading page...</div>}>
                <Routes>
                    <Route path='/' element={<HomePage moviesList={trendingMovies} />} />
                    <Route path='/movies' element={<MoviesPage onSearch={getMovies} moviesList={searchedMovies}/>} />
                        <Route path='/movies/:movieId' element={<MovieDetailsPage getMovieById={getMovieById} movie={movie}/>}>
                            <Route path='cast' element={<MovieCast cast={movieCast} getCast={getCast}/>} />
                            <Route path='reviews' element={<MovieReviews reviews={movieReviews} getReviews={getReviews}/>} />
                        </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}
export default App;

