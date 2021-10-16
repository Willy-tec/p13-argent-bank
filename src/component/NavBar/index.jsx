import logo from '../../img/argentBankLogo.png';
import './style.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearAll } from '../../script/service';

function NavBar() {
    const isConnected = useSelector((state) => state.connected);
    const location = useLocation();
    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isConnected ? (
                        <>
                            {location.pathname !== '/profile' ? (
                                <Link className="main-nav-item" to="/profile">
                                    Profile&nbsp;
                                </Link>
                            ) : (
                                ''
                            )}
                            <button
                                className="main-nav-item"
                                onClick={clearAll}
                            >
                                <i className="fa fa-user-circle"></i>
                                &nbsp;Sign Out
                            </button>
                        </>
                    ) : (
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                            &nbsp;Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
