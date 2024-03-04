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
                                        <i className="material-icons prefix">account_circle</i>
                                        <input id="icon_prefix" type="text" className="validate" placeholder="Full Name" />
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="material-icons prefix">email</i>
                                        <input id="icon_email" type="email" className="validate" placeholder="Your Email" />
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="material-icons prefix">lock</i>
                                        <input id="icon_password" type="password" className="validate" placeholder="Password" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button className="btn waves-effect waves-light center-align" type="submit" name="action">
                            Sign Up
                            <i className="material-icons right">send</i>
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
