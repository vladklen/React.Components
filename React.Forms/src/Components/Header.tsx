import { NavLink } from 'react-router-dom';
import { PathConstants, PathRoutesNames } from '../routes/PathConstants';

export default function Header() {
  return (
    <header>
      <div className="header-div">
        <h1 className="title">
          <NavLink
            to={PathConstants.HOME}
            className={({ isActive, isPending, isTransitioning }) =>
              [
                isPending ? 'pending' : '',
                isActive ? 'active' : '',
                isTransitioning ? 'transitioning' : '',
              ].join(' ')
            }
          >
            {PathRoutesNames.HOME}
          </NavLink>
        </h1>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to={PathConstants.FIRST_FORM}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? 'pending' : '',
                    isActive ? 'active' : '',
                    isTransitioning ? 'transitioning' : '',
                  ].join(' ')
                }
              >
                {PathRoutesNames.FIRST_FORM}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={PathConstants.SECOND_FORM}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? 'pending' : '',
                    isActive ? 'active' : '',
                    isTransitioning ? 'transitioning' : '',
                  ].join(' ')
                }
              >
                {PathRoutesNames.SECOND_FORM}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
