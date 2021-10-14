import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { profile, update } from '../../script/service';
import { Redirect } from 'react-router';
import { useState } from 'react';

function Profile() {
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [editMode, setEditMode] = useState(false);

    profile({ token }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: 'setConnect', payload: { connected: true } });
            dispatch({
                type: 'setInfo',
                payload: {
                    lastName: response.body.lastName,
                    firstName: response.body.firstName,
                },
            });
        } else if (!response.status) setRedirect(true);
    });
    let firstName = useSelector((state) => state.firstName);
    let lastName = useSelector((state) => state.lastName);

    let isConnected = useSelector((state) => state.connected);
    if (redirect) return <Redirect to="/login" />;
    function editHandler(ev) {
        let editValue = editMode;
        setEditMode(!editValue);
        console.log(ev.target.id);
        if (ev.target.id === 'save-button') {
        }
    }
    if (isConnected)
        return (
            <>
                <main className="main bg-dark">
                    <div className="header">
                        {editMode ? (
                            <>
                                <h1>
                                    Welcome back
                                    <br />
                                    <input
                                        type="text"
                                        className="header-inputField"
                                        size={firstName.length}
                                        placeholder={`${firstName}`}
                                    />
                                    <input
                                        type="text"
                                        className="header-inputField"
                                        size={lastName.length}
                                        placeholder={`${lastName}`}
                                    />
                                </h1>
                                <button
                                    className="edit-button"
                                    onClick={editHandler}
                                    id="save-button"
                                >
                                    Save
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={editHandler}
                                    id="cancel-button"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h1>
                                    Welcome back
                                    <br />
                                    {`${firstName} ${lastName}`}
                                </h1>
                                <button
                                    className="edit-button"
                                    onClick={editHandler}
                                    id="edit-button"
                                >
                                    Edit Name
                                </button>
                            </>
                        )}
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Checking (x8349)
                            </h3>
                            <p className="account-amount">$2,082.79</p>
                            <p className="account-amount-description">
                                Available Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Savings (x6712)
                            </h3>
                            <p className="account-amount">$10,928.42</p>
                            <p className="account-amount-description">
                                Available Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">
                                Argent Bank Credit Card (x8349)
                            </h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">
                                Current Balance
                            </p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">
                                View transactions
                            </button>
                        </div>
                    </section>
                </main>
            </>
        );
    else return <div>Loading...</div>;
}

export default Profile;
