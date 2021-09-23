import './style.css';
import { signup } from '../../script/service';
import { useState } from 'react';
import { Redirect } from 'react-router';

function Signup() {
    const [needRedirect, setNeedRedicte] = useState(false);
    function handleSubmit(target) {
        target.preventDefault();
        let body = {
            email: document.forms[0].email.value,
            password: document.forms[0].password.value,
            name: document.forms[0].name.value,
            lastname: document.forms[0].lastname.value,
        };
        signup(body).then((response) => {
            if (response.status === 200) {
                console.log('user create');
                setNeedRedicte(true);
            } else if (response.status === 400)
                console.log('Error, user not found');
        });
    }
    if (needRedirect) return <Redirect to="/login" />;
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" id="lastname" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    {/* <a href="/profile" className="sign-in-button">
                        Sign In
                    </a> */}
                    <button className="sign-in-button">Sign Up</button>
                </form>
            </section>
        </main>
    );
}

export default Signup;
