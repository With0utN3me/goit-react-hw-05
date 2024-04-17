import GoBack from "../components/Navigation/GoBack";
import css from "./NotFoundPage.module.css"
const NotFoundPage = () => {
    return (
        <div className={css.noPageWrap}>
            <div className={css.goBackBtn}>
                <GoBack to="/">Go back to Home page.</GoBack>
            </div>
            
            <p className={css.noPageText}>Not Found Page.</p>
        </div>
    )
}
export default NotFoundPage;