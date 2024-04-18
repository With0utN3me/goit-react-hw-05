import './App.css'
import { useState, lazy, Suspense } from 'react';
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
    
    const [movieCast, setMovieCast] = useState([]);

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

    return (
        <div>
            <Navigation />
            <Suspense fallback={<div>Loading page...</div>}>
                <Routes>
                    <Route path='/' element={<HomePage options={options}/>} />
                    <Route path='/movies' element={<MoviesPage options={options}/>} />
                        <Route path='/movies/:movieId' element={<MovieDetailsPage options={options}/>}>
                            <Route path='cast' element={<MovieCast cast={movieCast} getCast={getCast}/>} />
                            <Route path='reviews' element={<MovieReviews options={options}/>} />
                        </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}
export default App;

