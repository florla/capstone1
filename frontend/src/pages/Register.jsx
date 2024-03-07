import React, { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/register', { // Use https in production
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if(data.invalid){
                return setSuccessMessage(data.invalid);
            }
            console.log('Success:', data.message);
            // Reset form data
            setFormData({ fullName: '', email: '', password: '' });
            // Set success message
            setSuccessMessage('Registration successful! Redirecting to login page...');
            setTimeout(() => {
                // Redirect to login page
                window.location.href = '/login';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally, display an error message
        });
    };

    return (
        <div className="container" style={{ marginTop: '90px' }}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card-panel z-depth-5">
                        <h4 className="center">Register</h4>
                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}
                        <form className="col s12 m12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input
                                        id="icon_prefix"
                                        type="text"
                                        className="validate"
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-field col s12 m12">
                                    <i className="material-icons prefix">email</i>
                                    <input
                                        id="icon_email"
                                        type="email"
                                        className="validate"
                                        placeholder="Your Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-field col s12 m12">
                                    <i className="material-icons prefix">lock</i>
                                    <input
                                        id="icon_password"
                                        type="password"
                                        className="validate"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light center-align" type="submit" name="action">
                                Sign Up
                                <i className="material-icons right">send</i>
                            </button>
                        </form>
                        <div className="center">
                            Already a user? <a href="/login">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
