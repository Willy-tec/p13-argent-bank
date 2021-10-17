import './style.css';
import { login } from '../../script/service';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../component/Loader';
import { useState } from 'react';

function Login() {
    let [waiting, setWaiting] = useState(false);
    let connection = useSelector((state) => state.connected);

    function handleSubmit(target) {
        target.preventDefault();
        let body = {
            email: document.forms[0].email.value,
            password: document.forms[0].password.value,
        };
        login(body).then((response) => {
            if (response.status !== 200) {
                console.log(response.message);
                document.forms[0].lastChild.innerText = response.message; // ['error-text'].value = 'Salut';
                setWaiting(false);
            }
        });

        setWaiting(true);
    }

    if (connection) return <Redirect to="/profile" />;
    else
        return (
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                        </div>
                        <Link className="input-link-signup" to="/signup">
                            Signup
                        </Link>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">
                            Sign In {waiting ? <Loader /> : ''}
                        </button>
                        <div className="error-message" id="error-text"></div>
                    </form>
                </section>
            </main>
        );
}

export default Login;
