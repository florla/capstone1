import React, { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // logic to handle form submission
        console.log(formData);
        // Clear form after submission
        setFormData({
            email: '',
            password: '',
        });
        alert('Logged in Successfully!');
    };

    return (
        <div className="container" style={{ marginTop: '90px' }}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card-panel z-depth-5">
                        <h4 className="center">Sign In</h4>
                        <div className="row">
                            <form className="col s12 m12" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12 m12">
                                        <i className="mdi-communication-email prefix"></i>
                                        <input
                                            id="icon_email"
                                            type="email"
                                            className="validate"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="icon_email">Your Email</label>
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="fa fa-unlock-alt prefix"></i>
                                        <input
                                            id="icon_password"
                                            type="password"
                                            className="validate"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="icon_password">Password</label>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light center" type="submit" name="action">
                                    Sign In
                                    <i className="fa fa-sign-in right"></i>
                                </button>
                                <div className="center" style={{ marginTop: '20px' }}>
                                    New User? <a href="/register">Register now!</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
