import { HiArrowLeft } from 'react-icons/hi';
import { Link } from "react-router-dom";
import css from "./GoBack.module.css"

const GoBack = ({ to, children }) => {
    return(
        <Link className={css.goBack} to={to}>
            <HiArrowLeft size="23" className={css.arrow}/>
            {children}
        </Link>
    )
}
export default GoBack;