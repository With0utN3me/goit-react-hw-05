import MovieList from "../components/MovieList/MovieList";
import css from "./HomePage.module.css"

const HomePage = ({ moviesList }) => {
    return(
        <div className={css.main}>
            <h2 className={css.trend}>Trending today</h2>
            <MovieList
                movies={moviesList}
            />
        </div>)
}
export default HomePage;