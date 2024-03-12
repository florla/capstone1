import React, { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidName, setInvalidName] = useState(''); 
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInvalidEmail('');
        setInvalidName('');
        setInvalidPassword('');
        if(!formData.fullName){
            setInvalidName('Please enter your full name.');
        }
        if(!formData.email){
            setInvalidEmail('Please enter your email.');
        }
        if(!formData.password){
            setInvalidPassword('Please enter your password.');
        }
        if(!formData.fullName || !formData.email || !formData.password){
            return;
        }
        if(formData.email && !formData.email.includes('@')){
            return setInvalidEmail('Please enter a valid email.');
        }
        
        fetch('https://capstone1-mlth.onrender.com/register', { // Use https in production
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
                setSuccessMessage('');
                return setErrorMessage(data.invalid);
            }
            // Reset form data
            setFormData({ fullName: '', email: '', password: '' });
            // Set success message
            setErrorMessage('');
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
                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
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
                                    {invalidName && <span className="helper-text" style={{ color: 'red' }}>{invalidName}</span>}
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
                                    {invalidEmail && <span className="helper-text" style={{ color: 'red' }}>{invalidEmail}</span>}
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
                                    {invalidPassword && <span className="helper-text" style={{ color: 'red' }}>{invalidPassword}</span>}
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
