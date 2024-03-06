import React, { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginStatus, setLoginStatus] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!formData.email) {
            isValid = false;
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            errors.email = 'Email is invalid.';
        }

        if (!formData.password) {
            isValid = false;
            errors.password = 'Password is required.';
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Optionally reset individual error messages as the user types
        if (!!errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop the submission if the form is not valid
        }
        
        fetch('http://localhost:5000/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Save the token to local storage
                localStorage.setItem('userToken', data.token);
                // Redirect to profile page or load profile information
                window.location.href = '/account'; // Adjust this URL to your profile page's route
            } else {
                throw new Error(data.message || 'Login failed');
            }
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
                                        {errors.email && <span className="helper-text" style={{ color: 'red' }}>{errors.email}</span>}
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
                                        {errors.password && <span className="helper-text" style={{ color: 'red' }}>{errors.password}</span>}
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
            {loginStatus && <p className="center">{loginStatus}</p>}
        </div>
    );
}

export default LoginPage;

