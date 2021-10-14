import logo from '../../img/argentBankLogo.png';
import './style.css';
import { useSelector } from 'react-redux';

function NavBar() {
    const isConnected = useSelector((state) => state.connected);
    console.log(isConnected);
    return (
        <>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    {isConnected ? (
                        <a className="main-nav-item" href="/login">
                            <i className="fa fa-user-circle"></i>
                            &nbsp;Sign Out
                        </a>
                    ) : (
                        <a className="main-nav-item" href="/login">
                            <i className="fa fa-user-circle"></i>
                            &nbsp;Sign In
                        </a>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
