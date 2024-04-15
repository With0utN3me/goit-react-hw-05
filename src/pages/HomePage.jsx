import MovieList from "../components/MovieList/MovieList";

const HomePage = ({ moviesList }) => {
    return(
        <div>
            <p>Home Page</p>
            <MovieList
                movies={moviesList}
            />
        </div>)
}
export default HomePage;