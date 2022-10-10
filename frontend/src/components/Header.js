import { Link } from 'react-router-dom';
import Vector from "../images/Vector.svg";

function Header(props) {
    return (
        <header className="header">
            <img src={Vector} alt="Лого" className="header__logo"/>
            <div className="header__group">
                <h2 className="header__email">{props.userEmail}</h2>
                <Link className="link header__link" to={props.route} onClick={props.onLogout} >{props.title}</Link>
            </div>
        </header>
    );
}

export default Header;