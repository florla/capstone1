import React, { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginStatus, setLoginStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/login', { // Use https in production
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setLoginStatus('Logged in Successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoginStatus('Login failed. Please check your credentials.');
        });
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
                                        <i className="material-icons prefix">email</i>
                                        <input
                                            id="icon_email"
                                            type="email"
                                            className="validate"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                        />
                                    </div>

                                    <div className="input-field col s12 m12">
                                        <i className="material-icons prefix">lock</i>
                                        <input
                                            id="icon_password"
                                            type="password"
                                            className="validate"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light center-align" type="submit" name="action">
                                    Sign In
                                    <i className="material-icons right">send</i>
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
