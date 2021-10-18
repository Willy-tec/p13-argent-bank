import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { profile, update } from '../../script/service';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { bankAccount } from '../../mockup/bancAccount';

function Profile() {
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const token = useSelector((state) => state.token);
    const firstName = useSelector((state) => state.firstName);
    const lastName = useSelector((state) => state.lastName);
    const isConnected = useSelector((state) => state.connected);
    const isProfileInfoLoad = useSelector((state) => state.profileInfoLoad);

    function editHandler({ target }) {
        setEditMode(!editMode);
        if (target.id === 'save-button') {
            let form = document.forms['form-edit'];
            let request = {
                token,
                firstName:
                    form['firstName-input'].value.trim() ||
                    form['firstName-input'].placeholder,
                lastName:
                    form['lastName-input'].value.trim() ||
                    form['lastName-input'].placeholder,
            };
            if (
                firstName !== request.firstName ||
                lastName !== request.lastName
            ) {
                if (form.checkValidity()) {
                    update(request).then(() => {
                        dispatch({
                            type: 'setProfileInfoLoad',
                            payload: { profileInfoLoad: false },
                        });
                        profile();
                    });
                }
            }
        }
    }
    if (isConnected && isProfileInfoLoad)
        return (
            <main className="main bg-dark">
                <div className="header">
                    {editMode ? (
                        <form id="form-edit">
                            <h1>Welcome back</h1>
                            <div>
                                <input
                                    type="text"
                                    id="firstName-input"
                                    className="header-inputField"
                                    size={10}
                                    pattern={'[A-Za-z]{2,}'}
                                    placeholder={`${firstName}`}
                                />
                                <input
                                    type="text"
                                    id="lastName-input"
                                    className="header-inputField"
                                    size={10}
                                    pattern={'[A-Za-z]{2,}'}
                                    placeholder={`${lastName}`}
                                />
                            </div>
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
                        </form>
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
                {bankAccount.map((el, index) => {
                    return (
                        <section className="account" key={index + el.title}>
                            <div className="account-content-wrapper">
                                <h3 className="account-title">
                                    Argent Bank {el.title} (x
                                    {el.transactionCount})
                                </h3>
                                <p className="account-amount">${el.balance}</p>
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
                    );
                })}
            </main>
        );
    else if (isConnected && !isProfileInfoLoad)
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Loading
                        <span className="header_dot-1">. </span>
                        <span className="header_dot-2">. </span>
                        <span className="header_dot-3">. </span>
                    </h1>
                </div>
            </main>
        );
    else return <Redirect to="/" />;
}

export default Profile;
