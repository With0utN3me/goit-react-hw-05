import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import css from "./Navigation.module.css";
const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
    return(
        <header className={css.header}>
            <nav className={css.nav}>
                <NavLink className={buildLinkClass} to="/">
                    HomePage
                </NavLink>

                <NavLink className={buildLinkClass} to="/movies">
                    MoviesPage
                </NavLink>
            </nav>
        </header>
    );
}
export default Navigation;