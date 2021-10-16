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
            firstName: document.forms[0].name.value,
            lastName: document.forms[0].lastname.value,
        };
        console.log(body);
        if (document.forms[0].checkValidity())
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
                        <input
                            type="text"
                            id="name"
                            pattern="[A-Za-z]{2,}"
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            pattern="[A-Za-z]{2,}"
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            pattern=".{8,}"
                            required
                        />
                    </div>
                    <button className="sign-in-button">Sign Up</button>
                </form>
            </section>
        </main>
    );
}

export default Signup;
