import './style.css';
import { login } from '../../script/service';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    let [redirect, setRedirect] = useState(false);

    function handleSubmit(target) {
        target.preventDefault();
        let body = {
            email: document.forms[0].email.value,
            password: document.forms[0].password.value,
        };
        login(body).then((response) => {
            if (response.status === 200) {
                console.log('login');
                setRedirect(true);
            } else if (response.status === 400)
                console.log('Error, user not found');
        });
    }

    if (redirect) return <Redirect to="/profile" />;
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <Link className="input-link-signup" to="/signup">
                        Signup
                    </Link>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/* <a href="/profile" className="sign-in-button">
                        Sign In
                    </a> */}
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default Login;
