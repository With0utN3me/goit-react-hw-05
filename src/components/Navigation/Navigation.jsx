import { NavLink } from "react-router-dom";
import clsx from 'clsx';

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