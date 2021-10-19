import logo from '../../img/argentBankLogo.png';
import './style.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAll } from '../../script/service';

function NavBar() {
    const isConnected = useSelector((state) => state.connected);
    const firstname = useSelector((state) => state.firstName);
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
                            <Link className="main-nav-item" to="/profile">
                                <i className="fa fa-user-circle">&nbsp;</i>
                                {firstname}
                            </Link>
                            <button
                                className="main-nav-item"
                                onClick={clearAll}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle">&nbsp;</i>
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
