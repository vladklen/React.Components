import { Link } from 'react-router-dom';
import { PathConstants, PathRoutesNames } from '../routes/PathConstants';

export default function Header() {
  return (
    <header>
      <div className="header-div">
        <h1 className="title">
          <Link to={PathConstants.HOME}>{PathRoutesNames.HOME}</Link>
        </h1>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={PathConstants.FIRST_FORM}>
                {PathRoutesNames.FIRST_FORM}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={PathConstants.SECOND_FORM}>
                {PathRoutesNames.SECOND_FORM}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
