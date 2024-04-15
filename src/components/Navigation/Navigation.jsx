import { NavLink } from "react-router-dom";

const Navigation = () => {
    return(
        <nav>
            <NavLink to="/">
                HomePage
            </NavLink>

            <NavLink to="/movies">
                MoviesPage
            </NavLink>
        </nav>
    );
}
export default Navigation;