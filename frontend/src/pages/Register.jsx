import React from 'react';

function RegisterPage() {
    return (
        <div className="container" style={{ marginTop: '90px' }}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card-panel z-depth-5">
                        <h4 className="center">Register</h4>
                        <div className="row">
                            <form className="col s12 m12">
                                <div className="row">
                                    <div className="input-field col s12 m12">
                                        <i className="mdi-action-account-circle prefix"></i>
                                        <input id="icon_prefix" type="text" className="validate" />
                                        <label htmlFor="icon_prefix">Full Name</label>
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input id="icon_email" type="email" className="validate" />
                                        <label htmlFor="icon_email">Your Email</label>
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="fa fa-unlock-alt prefix"></i>
                                        <input id="icon_password" type="password" className="validate" />
                                        <label htmlFor="icon_password">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button className="btn waves-effect waves-light center" type="submit" name="action">
                            Sign Up
                            <i className="fa fa-sign-in right"></i>
                        </button>
                        <div className="center" style={{ marginTop: '20px' }}>
                            Already a user? <a href="/login">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
